import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Search, 
    Filter,
    Eye,
    EyeOff,
    Star,
    Package
} from 'lucide-react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../database';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'snapback',
        quantity: '',
        featured: false,
        active: true
    });

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, searchTerm, categoryFilter]);

    const loadProducts = async () => {
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        setFilteredProducts(filtered);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            };

            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
                toast.success('Product updated successfully');
            } else {
                await createProduct(productData);
                toast.success('Product created successfully');
            }

            setShowModal(false);
            setEditingProduct(null);
            resetForm();
            loadProducts();
        } catch (error) {
            toast.error(error.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            image: product.image,
            category: product.category,
            quantity: product.quantity.toString(),
            featured: product.featured,
            active: product.active
        });
        setShowModal(true);
    };

    const handleDelete = async (productId) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await deleteProduct(productId);
            toast.success('Product deleted successfully');
            loadProducts();
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const toggleProductStatus = async (product) => {
        try {
            await updateProduct(product.id, { ...product, active: !product.active });
            toast.success(`Product ${product.active ? 'deactivated' : 'activated'}`);
            loadProducts();
        } catch (error) {
            toast.error('Failed to update product status');
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            description: '',
            price: '',
            image: '',
            category: 'snapback',
            quantity: '',
            featured: false,
            active: true
        });
    };

    const categories = ['all', 'snapback', 'beanie', 'wavecap'];

    if (loading && products.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-white">Product Management</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setEditingProduct(null);
                        setShowModal(true);
                    }}
                    className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all flex items-center"
                >
                    <Plus className="mr-2" size={20} />
                    Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-600" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all ${
                            !product.active ? 'opacity-60' : ''
                        }`}
                    >
                        <div className="relative mb-4">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                                {product.featured && (
                                    <span className="bg-yellow-500 text-white p-1 rounded-full">
                                        <Star size={12} fill="currentColor" />
                                    </span>
                                )}
                                <button
                                    onClick={() => toggleProductStatus(product)}
                                    className={`p-1 rounded-full ${
                                        product.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                    }`}
                                >
                                    {product.active ? <Eye size={12} /> : <EyeOff size={12} />}
                                </button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                    product.quantity === 0 
                                        ? 'bg-red-100 text-red-800'
                                        : product.quantity < 10
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {product.quantity === 0 ? 'Out of Stock' : `${product.quantity} in stock`}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-black mb-1">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-black">₦{product.price}</span>
                                <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(product)}
                                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center"
                            >
                                <Edit size={16} className="mr-1" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center"
                            >
                                <Trash2 size={16} className="mr-1" />
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <Package className="mx-auto mb-4 text-gray-400" size={64} />
                    <h2 className="text-2xl font-bold text-white mb-4">No products found</h2>
                    <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Product Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-6">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Product ID
                                            </label>
                                            <input
                                                type="text"
                                                name="id"
                                                value={formData.id}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                                disabled={editingProduct}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Category
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            >
                                                <option value="snapback">Snapback</option>
                                                <option value="beanie">Beanie</option>
                                                <option value="wavecap">Wave Cap</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Price (₦)
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                step="0.01"
                                                min="0"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleInputChange}
                                                min="0"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                checked={formData.featured}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            <span className="text-sm font-bold text-gray-700">Featured Product</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="active"
                                                checked={formData.active}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            <span className="text-sm font-bold text-gray-700">Active</span>
                                        </label>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AdminProducts;