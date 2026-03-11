import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import { getProducts, addToWishlist, removeFromWishlist, getUserWishlist } from './database';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { theme, modernCard, buttonStyles, staggerContainer, staggerItem } from './theme';

function Shop() {
    const { addToCart } = useContext(CartContext);
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadProducts();
        if (user) {
            loadWishlist();
        }
    }, [user]);

    useEffect(() => {
        filterAndSortProducts();
    }, [products, searchTerm, categoryFilter, priceRange, sortBy]);

    const loadProducts = async () => {
        try {
            const allProducts = await getProducts();
            setProducts(allProducts);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const loadWishlist = async () => {
        try {
            const userWishlist = await getUserWishlist(user.id);
            setWishlist(userWishlist.map(item => item.product_id));
        } catch (error) {
            console.error('Failed to load wishlist:', error);
        }
    };

    const filterAndSortProducts = () => {
        let filtered = products;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Price filter
        filtered = filtered.filter(product => 
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }



        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'newest':
                    return new Date(b.created_at) - new Date(a.created_at);
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    };

    const handleWishlistToggle = async (productId) => {
        if (!user) {
            toast.error('Please login to add to wishlist');
            return;
        }

        try {
            if (wishlist.includes(productId)) {
                await removeFromWishlist(user.id, productId);
                setWishlist(prev => prev.filter(id => id !== productId));
                toast.success('Removed from wishlist');
            } else {
                await addToWishlist(user.id, productId);
                setWishlist(prev => [...prev, productId]);
                toast.success('Added to wishlist');
            }
        } catch (error) {
            toast.error('Failed to update wishlist');
        }
    };

    const categories = [
        { value: 'all', label: 'All Products' },
        { value: 'snapback', label: 'Snapbacks' },
        { value: 'beanie', label: 'Beanies' },
        { value: 'wavecap', label: 'Wave Caps' }
    ];

    const sortOptions = [
        { value: 'name', label: 'Name A-Z' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'newest', label: 'Newest First' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
                    SHOP COLLECTION
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Discover our premium streetwear collection. Quality meets style in every piece.
                </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`${modernCard.glass} p-6 mb-8`}
            >
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Quick Filters */}
                    <div className="flex gap-3 flex-wrap">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            {categories.map(category => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`${buttonStyles.glass} flex items-center gap-2`}
                        >
                            <SlidersHorizontal size={20} />
                            Filters
                        </button>

                        <div className="flex border border-white/30 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 ${viewMode === 'grid' ? 'bg-white/30' : 'bg-white/10'} transition-all`}
                            >
                                <Grid size={20} className="text-white" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 ${viewMode === 'list' ? 'bg-white/30' : 'bg-white/10'} transition-all`}
                            >
                                <List size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-white/20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-bold mb-2">Price Range</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100000"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                            className="flex-1"
                                        />
                                        <span className="text-white">₦{priceRange[0]} - ₦{priceRange[1]}</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-8">
                <p className="text-white">
                    Showing {filteredProducts.length} of {products.length} products
                </p>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'grid-cols-1'
                }`}>
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-white mb-4">No products found</h2>
                        <p className="text-gray-400">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className={`${modernCard.glass} relative p-6 hover:shadow-2xl transition-all duration-500 group-hover:border-white/50 ${
                                viewMode === 'list' ? 'flex items-center gap-6' : ''
                            }`}>
                                {/* Wishlist Button */}
                                <button
                                    onClick={() => handleWishlistToggle(product.id)}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-all"
                                >
                                    <Heart 
                                        size={20} 
                                        className={`${wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'}`}
                                    />
                                </button>

                                {/* Product Image */}
                                <Link to={`/product/${product.id}`} className={viewMode === 'list' ? 'flex-shrink-0' : 'block'}>
                                    <div className={`relative overflow-hidden rounded-2xl ${
                                        viewMode === 'list' ? 'w-32 h-32' : 'w-full h-48 mb-4'
                                    }`}>
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300 mb-2">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-300 mb-3 line-clamp-2">{product.description}</p>
                                    
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-white">₦{product.price}</span>
                                        <span className="text-sm text-gray-400 capitalize px-2 py-1 bg-white/10 rounded-full">
                                            {product.category}
                                        </span>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="mb-4">
                                        {product.quantity === 0 ? (
                                            <span className="text-red-500 font-bold text-sm">OUT OF STOCK</span>
                                        ) : product.quantity < 10 ? (
                                            <span className="text-orange-500 font-bold text-sm">Only {product.quantity} left!</span>
                                        ) : (
                                            <span className="text-green-500 font-bold text-sm">In Stock</span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-col sm:flex-row' : ''}`}>
                                        <button
                                            onClick={() => addToCart(product)}
                                            disabled={product.quantity === 0}
                                            className={`${
                                                product.quantity === 0
                                                    ? 'bg-gray-600 cursor-not-allowed'
                                                    : buttonStyles.accent
                                            } flex-1 flex items-center justify-center gap-2`}
                                        >
                                            <ShoppingCart size={16} />
                                            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                        
                                        <Link
                                            to={`/product/${product.id}`}
                                            className={`${buttonStyles.glass} flex items-center justify-center px-4`}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Shop;