import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { useAuth } from './AuthContext';
import { getUserOrders } from './database';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function OrderHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadOrders();
        }
    }, [user]);

    const loadOrders = async () => {
        try {
            const userOrders = await getUserOrders(user.id);
            setOrders(userOrders);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="text-yellow-500" size={20} />;
            case 'processing':
                return <Package className="text-blue-500" size={20} />;
            case 'shipped':
                return <Truck className="text-purple-500" size={20} />;
            case 'delivered':
                return <CheckCircle className="text-green-500" size={20} />;
            case 'cancelled':
                return <XCircle className="text-red-500" size={20} />;
            default:
                return <Clock className="text-gray-500" size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-500';
            case 'processing':
                return 'text-blue-500';
            case 'shipped':
                return 'text-purple-500';
            case 'delivered':
                return 'text-green-500';
            case 'cancelled':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
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
                <h1 className="text-4xl font-bold text-white">Order History</h1>
                <Package className="text-white" size={32} />
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <Package className="mx-auto mb-4 text-gray-400" size={64} />
                    <h2 className="text-2xl font-bold text-white mb-4">No orders yet</h2>
                    <p className="text-gray-400 mb-8">Start shopping to see your orders here!</p>
                    <a 
                        href="/shop"
                        className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                    >
                        Start Shopping
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-gray-200">
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-2">
                                        Order #{order.id.slice(0, 8)}
                                    </h3>
                                    <p className="text-gray-600">
                                        Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                
                                <div className="flex items-center mt-4 md:mt-0">
                                    {getStatusIcon(order.status)}
                                    <span className={`ml-2 font-bold capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-6">
                                <h4 className="font-bold text-black mb-4">Items Ordered:</h4>
                                <div className="space-y-3">
                                    {order.order_items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                            <img 
                                                src={item.products.image} 
                                                alt={item.products.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h5 className="font-bold text-black">{item.products.name}</h5>
                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-black">₦{item.price}</p>
                                                <p className="text-sm text-gray-600">
                                                    ₦{(item.price * item.quantity).toFixed(2)} total
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                                <div className="mb-4 md:mb-0">
                                    {order.tracking_number && (
                                        <p className="text-gray-600">
                                            <strong>Tracking Number:</strong> {order.tracking_number}
                                        </p>
                                    )}
                                    <p className="text-gray-600">
                                        <strong>Payment Status:</strong> 
                                        <span className={`ml-1 capitalize ${
                                            order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                                        }`}>
                                            {order.payment_status}
                                        </span>
                                    </p>
                                </div>
                                
                                <div className="text-right">
                                    <p className="text-gray-600">Subtotal: ₦{order.subtotal}</p>
                                    <p className="text-gray-600">Tax: ₦{order.tax}</p>
                                    <p className="text-2xl font-bold text-black">Total: ₦{order.total}</p>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            {order.addresses && (
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <h4 className="font-bold text-black mb-2">Shipping Address:</h4>
                                    <p className="text-gray-600">
                                        {order.addresses.first_name} {order.addresses.last_name}<br />
                                        {order.addresses.street_address}<br />
                                        {order.addresses.city}, {order.addresses.state} {order.addresses.zip_code}<br />
                                        {order.addresses.country}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
