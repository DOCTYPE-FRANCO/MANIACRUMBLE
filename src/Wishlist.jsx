import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CartContext } from './CartContext';
import { getUserWishlist, removeFromWishlist } from './database';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function Wishlist() {
    const { user } = useAuth();
    const { addToCart } = useContext(CartContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadWishlist();
        }
    }, [user]);

    const loadWishlist = async () => {
        try {
            const wishlist = await getUserWishlist(user.id);
            setWishlistItems(wishlist);
        } catch (error) {
            toast.error('Failed to load wishlist');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(user.id, productId);
            setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
            toast.success('Removed from wishlist');
        } catch (error) {
            toast.error('Failed to remove from wishlist');
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        // Optionally remove from wishlist after adding to cart
        // handleRemoveFromWishlist(product.id);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-10 px-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-white">My Wishlist</h1>
                <Heart className="text-red-500 fill-current" size={32} />
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                    <Heart className="mx-auto mb-4 text-gray-400" size={64} />
                    <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-400 mb-8">Start adding products you love to your wishlist!</p>
                    <Link 
                        to="/shop"
                        className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative mb-4">
                                <Link to={`/product/${item.products.id}`}>
                                    <img 
                                        src={item.products.image} 
                                        alt={item.products.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </Link>
                                <button
                                    onClick={() => handleRemoveFromWishlist(item.product_id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <Link to={`/product/${item.products.id}`}>
                                    <h3 className="text-xl font-bold text-black hover:text-gray-700 transition-all">
                                        {item.products.name}
                                    </h3>
                                </Link>
                                <p className="text-gray-600 mt-1">{item.products.description}</p>
                                <p className="text-2xl font-bold text-black mt-2">${item.products.price}</p>
                            </div>

                            <div className="mb-4">
                                {item.products.quantity === 0 ? (
                                    <p className="text-red-600 font-bold text-sm">OUT OF STOCK</p>
                                ) : item.products.quantity < 10 ? (
                                    <p className="text-orange-500 font-bold text-sm">Only {item.products.quantity} left!</p>
                                ) : (
                                    <p className="text-green-600 font-bold text-sm">In Stock</p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAddToCart(item.products)}
                                    disabled={item.products.quantity === 0}
                                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-bold transition-all ${
                                        item.products.quantity === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <ShoppingCart className="mr-2" size={16} />
                                    {item.products.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                                
                                <Link
                                    to={`/product/${item.products.id}`}
                                    className="px-4 py-2 border-2 border-black text-black rounded-lg font-bold hover:bg-black hover:text-white transition-all"
                                >
                                    View
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
