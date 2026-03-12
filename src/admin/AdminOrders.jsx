import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Search, 
    Filter, 
    Eye, 
    Package, 
    Clock, 
    CheckCircle, 
    XCircle, 
    Truck,
    Edit
} from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../database';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [orders, searchTerm, statusFilter]);

    const loadOrders = async () => {
        try {
            const allOrders = await getAllOrders();
            setOrders(allOrders);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const filterOrders = () => {
        let filtered = orders;

        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        setFilteredOrders(filtered);
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            toast.success('Order status updated successfully');
            loadOrders();
        } catch (error) {
            toast.error('Failed to update order status');
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

    const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

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
                <h1 className="text-4xl font-bold text-white">Order Management</h1>
                <Package className="text-white" size={32} />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders by ID, customer name, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-600" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>
                                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-16">
                        <Package className="mx-auto mb-4 text-gray-400" size={64} />
                        <h2 className="text-2xl font-bold text-black mb-4">No orders found</h2>
                        <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Order ID</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Items</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Total</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-sm font-semibold">
                                                #{order.id.slice(0, 8)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-semibold text-black">
                                                    {order.profiles?.name || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {order.profiles?.email || 'N/A'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-600">
                                                {order.order_items?.length || 0} items
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-black">₦{order.total}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(order.status)}
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-600">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setShowOrderModal(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {showOrderModal && selectedOrder && (
                <>
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setShowOrderModal(false)}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Order Details</h2>
                                <button
                                    onClick={() => setShowOrderModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">Order Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                                        <p><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                                        <p><strong>Status:</strong> 
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                                                {selectedOrder.status}
                                            </span>
                                        </p>
                                        <p><strong>Payment Status:</strong> {selectedOrder.payment_status}</p>
                                        {selectedOrder.tracking_number && (
                                            <p><strong>Tracking:</strong> {selectedOrder.tracking_number}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-3">Customer Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Name:</strong> {selectedOrder.profiles?.name || 'N/A'}</p>
                                        <p><strong>Email:</strong> {selectedOrder.profiles?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-lg mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.order_items?.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                            <img 
                                                src={item.products?.image} 
                                                alt={item.products?.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{item.products?.name}</h4>
                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">₦{item.price}</p>
                                                <p className="text-sm text-gray-600">
                                                    ₦{(item.price * item.quantity).toFixed(2)} total
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total: ₦{selectedOrder.total}</span>
                                    <div className="flex gap-2">
                                        <select
                                            value={selectedOrder.status}
                                            onChange={(e) => {
                                                handleStatusUpdate(selectedOrder.id, e.target.value);
                                                setSelectedOrder({...selectedOrder, status: e.target.value});
                                            }}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminOrders;