import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import { getProducts, getProductReviews, createReview, addToWishlist, removeFromWishlist, getUserWishlist } from './database';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        loadProduct();
        loadReviews();
        if (user) {
            checkWishlistStatus();
        }
    }, [id, user]);

    const loadProduct = async () => {
        try {
            const products = await getProducts();
            const foundProduct = products.find(p => p.id === id);
            setProduct(foundProduct);
        } catch (error) {
            toast.error('Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    const loadReviews = async () => {
        try {
            const productReviews = await getProductReviews(id);
            setReviews(productReviews);
        } catch (error) {
            console.error('Failed to load reviews:', error);
        }
    };

    const checkWishlistStatus = async () => {
        try {
            const wishlist = await getUserWishlist(user.id);
            setIsInWishlist(wishlist.some(item => item.product_id === id));
        } catch (error) {
            console.error('Failed to check wishlist:', error);
        }
    };

    const handleWishlistToggle = async () => {
        if (!user) {
            toast.error('Please login to add to wishlist');
            return;
        }

        try {
            if (isInWishlist) {
                await removeFromWishlist(user.id, id);
                setIsInWishlist(false);
                toast.success('Removed from wishlist');
            } else {
                await addToWishlist(user.id, id);
                setIsInWishlist(true);
                toast.success('Added to wishlist');
            }
        } catch (error) {
            toast.error('Failed to update wishlist');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to leave a review');
            return;
        }

        setReviewLoading(true);
        try {
            await createReview({
                user_id: user.id,
                product_id: id,
                rating: newReview.rating,
                comment: newReview.comment
            });
            toast.success('Review added successfully');
            setNewReview({ rating: 5, comment: '' });
            loadReviews();
        } catch (error) {
            toast.error('Failed to add review');
        } finally {
            setReviewLoading(false);
        }
    };

    const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-white">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <Link to="/shop" className="text-blue-400 hover:text-blue-300">
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-10 px-4 max-w-6xl mx-auto">
            <Link to="/shop" className="inline-flex items-center text-white hover:text-gray-300 mb-6">
                <ArrowLeft className="mr-2" size={20} />
                Back to Shop
            </Link>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center"
                >
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full max-w-md rounded-2xl shadow-lg"
                    />
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white"
                >
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-300 text-lg mb-6">{product.description}</p>
                    
                    <div className="flex items-center mb-4">
                        <div className="flex items-center mr-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-300">({reviews.length} reviews)</span>
                    </div>

                    <div className="text-3xl font-bold mb-6">₦{product.price}</div>

                    <div className="mb-6">
                        {product.quantity === 0 ? (
                            <p className="text-red-500 font-bold">OUT OF STOCK</p>
                        ) : product.quantity < 10 ? (
                            <p className="text-orange-500 font-bold">Only {product.quantity} left!</p>
                        ) : (
                            <p className="text-green-500 font-bold">In Stock ({product.quantity} available)</p>
                        )}
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => addToCart(product)}
                            disabled={product.quantity === 0}
                            className={`flex items-center px-6 py-3 rounded-lg font-bold transition-all ${
                                product.quantity === 0
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-gray-200'
                            }`}
                        >
                            <ShoppingCart className="mr-2" size={20} />
                            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <button
                            onClick={handleWishlistToggle}
                            className={`flex items-center px-6 py-3 rounded-lg font-bold border-2 transition-all ${
                                isInWishlist
                                    ? 'bg-red-500 text-white border-red-500'
                                    : 'text-white border-white hover:bg-white hover:text-black'
                            }`}
                        >
                            <Heart className={`mr-2 ${isInWishlist ? 'fill-current' : ''}`} size={20} />
                            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>

                    <div className="text-sm text-gray-400">
                        <p>Category: <span className="capitalize">{product.category}</span></p>
                        <p>Product ID: {product.id}</p>
                    </div>
                </motion.div>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-900 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>

                {/* Add Review Form */}
                {user && (
                    <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-bold text-white mb-4">Write a Review</h3>
                        
                        <div className="mb-4">
                            <label className="block text-white mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                                        className={`p-1 ${rating <= newReview.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                    >
                                        <Star className="w-6 h-6 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Comment</label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-gray-700 text-white"
                                rows="4"
                                placeholder="Share your thoughts about this product..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={reviewLoading}
                            className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 disabled:opacity-50"
                        >
                            {reviewLoading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                    {reviews.length === 0 ? (
                        <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="p-4 bg-gray-800 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <div className="flex items-center mr-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-white font-bold">{review.profiles?.name || 'Anonymous'}</span>
                                    <span className="text-gray-400 ml-2 text-sm">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-300">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
