import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Package, 
    ShoppingCart, 
    Users, 
    DollarSign, 
    TrendingUp, 
    Eye,
    Settings,
    BarChart3
} from 'lucide-react';
import { getAllOrders, getAllProducts } from '../database';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        lowStockProducts: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [orders, products] = await Promise.all([
                getAllOrders(),
                getAllProducts()
            ]);

            const totalRevenue = orders
                .filter(order => order.payment_status === 'paid')
                .reduce((sum, order) => sum + parseFloat(order.total), 0);

            const lowStockProducts = products.filter(product => product.quantity < 10).length;

            const recentOrders = orders.slice(0, 5);

            setStats({
                totalOrders: orders.length,
                totalRevenue,
                totalProducts: products.length,
                lowStockProducts,
                recentOrders
            });
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
        <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                <Settings className="text-white" size={32} />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                            <p className="text-3xl font-bold text-black">{stats.totalOrders}</p>
                        </div>
                        <ShoppingCart className="text-blue-500" size={32} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                            <p className="text-3xl font-bold text-black">₦{stats.totalRevenue.toFixed(2)}</p>
                        </div>
                        <DollarSign className="text-green-500" size={32} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Total Products</p>
                            <p className="text-3xl font-bold text-black">{stats.totalProducts}</p>
                        </div>
                        <Package className="text-purple-500" size={32} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
                            <p className="text-3xl font-bold text-black">{stats.lowStockProducts}</p>
                        </div>
                        <TrendingUp className="text-red-500" size={32} />
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Link to="/admin/products">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Manage Products</h3>
                                <p className="text-blue-100">Add, edit, or remove products</p>
                            </div>
                            <Package size={32} />
                        </div>
                    </motion.div>
                </Link>

                <Link to="/admin/orders">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-all cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Manage Orders</h3>
                                <p className="text-green-100">View and update order status</p>
                            </div>
                            <ShoppingCart size={32} />
                        </div>
                    </motion.div>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-all cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Analytics</h3>
                            <p className="text-purple-100">View detailed reports</p>
                        </div>
                        <BarChart3 size={32} />
                    </div>
                </motion.div>
            </div>

            {/* Recent Orders */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black">Recent Orders</h2>
                    <Link 
                        to="/admin/orders"
                        className="text-blue-500 hover:text-blue-600 font-medium flex items-center"
                    >
                        View All <Eye className="ml-1" size={16} />
                    </Link>
                </div>

                {stats.recentOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No orders yet</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-mono text-sm">
                                            #{order.id.slice(0, 8)}
                                        </td>
                                        <td className="py-3 px-4">
                                            {order.profiles?.name || order.profiles?.email || 'N/A'}
                                        </td>
                                        <td className="py-3 px-4 font-semibold">
                                            ₦{order.total}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default AdminDashboard;
