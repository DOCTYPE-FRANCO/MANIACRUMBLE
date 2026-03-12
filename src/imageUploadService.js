import { supabase } from './supabaseClient';

export const uploadProductImage = async (file, productId) => {
    try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}-${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
};

export const deleteProductImage = async (imageUrl) => {
    try {
        // Extract file path from URL
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `products/${fileName}`;

        const { error } = await supabase.storage
            .from('product-images')
            .remove([filePath]);

        if (error) {
            throw error;
        }

        return true;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw new Error('Failed to delete image');
    }
};

// Fallback function for local development or when Supabase Storage is not configured
export const createLocalImagePath = (file) => {
    return new Promise((resolve) => {
        // For development, we'll just use the file name
        // In production, you should set up proper file storage
        const imagePath = `/Products/${file.name}`;
        resolve(imagePath);
    });
};

// Validate image file
export const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!validTypes.includes(file.type)) {
        throw new Error('Please select a valid image file (JPEG, PNG, or WebP)');
    }

    if (file.size > maxSize) {
        throw new Error('Image size should be less than 20MB');
    }

    return true;
};