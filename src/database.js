import { supabase } from './supabaseClient';

// Products
export const getProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
};

export const getFeaturedProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .eq('active', true)
        .limit(3);
    
    if (error) throw error;
    return data;
};

export const getProductsByCategory = async (category) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('active', true);
    
    if (error) throw error;
    return data;
};

export const searchProducts = async (query) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`)
        .eq('active', true);
    
    if (error) throw error;
    return data;
};

// Orders
export const createOrder = async (orderData) => {
    const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

export const createOrderItems = async (orderItems) => {
    const { data, error } = await supabase
        .from('order_items')
        .insert(orderItems)
        .select();
    
    if (error) throw error;
    return data;
};

export const getUserOrders = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (*)
            ),
            addresses (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
};

// Addresses
export const getUserAddresses = async (userId) => {
    const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('is_default', { ascending: false });
    
    if (error) throw error;
    return data;
};

export const createAddress = async (addressData) => {
    const { data, error } = await supabase
        .from('addresses')
        .insert(addressData)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

export const updateAddress = async (id, addressData) => {
    const { data, error } = await supabase
        .from('addresses')
        .update(addressData)
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

export const deleteAddress = async (id) => {
    const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);
    
    if (error) throw error;
};

// Wishlist
export const getUserWishlist = async (userId) => {
    const { data, error } = await supabase
        .from('wishlist')
        .select(`
            *,
            products (*)
        `)
        .eq('user_id', userId);
    
    if (error) throw error;
    return data;
};

export const addToWishlist = async (userId, productId) => {
    const { data, error } = await supabase
        .from('wishlist')
        .insert({ user_id: userId, product_id: productId })
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

export const removeFromWishlist = async (userId, productId) => {
    const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
    
    if (error) throw error;
};

// Reviews
export const getProductReviews = async (productId) => {
    const { data, error } = await supabase
        .from('reviews')
        .select(`
            *,
            profiles (name)
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
};

export const createReview = async (reviewData) => {
    const { data, error } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

// Newsletter
export const subscribeNewsletter = async (email) => {
    const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

// Profile
export const getUserProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) throw error;
    return data;
};

export const updateUserProfile = async (userId, profileData) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

// Admin Functions
export const getAllOrders = async () => {
    // First get all orders with order_items and products
    const { data: orders, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (*)
            )
        `)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Then get profiles for all user_ids
    if (orders && orders.length > 0) {
        const userIds = [...new Set(orders.map(o => o.user_id))];
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, name, email')
            .in('id', userIds);
        
        // Map profiles to orders
        return orders.map(order => ({
            ...order,
            profiles: profiles?.find(p => p.id === order.user_id) || null
        }));
    }
    
    return orders || [];
};

export const updateOrderStatus = async (orderId, status) => {
    const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

export const getAllProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
};

export const createProduct = async (productData) => {
    const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

export const updateProduct = async (id, productData) => {
    const { data, error } = await supabase
        .from('products')
        .update({ ...productData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

export const deleteProduct = async (id) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
    
    if (error) throw error;
};

export const updateProductQuantity = async (id, quantity) => {
    const { data, error } = await supabase
        .from('products')
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};