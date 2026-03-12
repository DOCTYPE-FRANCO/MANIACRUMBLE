import React, {useState, useContext, useEffect} from "react";
import { CartContext }  from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, MapPin, Package, Truck, CheckCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useAuth } from "./AuthContext";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { createOrder, createOrderItems, createAddress, getUserAddresses } from "./database";
import { theme, modernCard, buttonStyles, glassmorphism } from "./theme";
import { toast } from "react-hot-toast";

function Cart(){
    const {items, removeFromCart, increment, decrement, number, isEmpty, total, clearCart} = useContext(CartContext);
    const { user } = useAuth();
    const [checkOut, setcheckOut] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressData, setAddressData] = useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Nigeria"
    });

    // Redirect to login if not authenticated
    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-white px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
                    <p className="text-xl text-gray-300 mb-8">You need to be logged in to view your cart and checkout.</p>
                    <button 
                        onClick={() => window.location.href = '/profile'}
                        className={buttonStyles.primary}
                    >
                        Sign In / Sign Up
                    </button>
                </motion.div>
            </div>
        );
    }

    useEffect(() => {
        if (user && checkOut) {
            loadAddresses();
        }
    }, [user, checkOut]);

    const loadAddresses = async () => {
        try {
            const userAddresses = await getUserAddresses(user.id);
            setAddresses(userAddresses);
            if (userAddresses.length > 0) {
                setSelectedAddress(userAddresses.find(addr => addr.is_default) || userAddresses[0]);
            }
        } catch (error) {
            console.error('Failed to load addresses:', error);
        }
    };

    const handleAddressChange = (e) => {
        const {name, value} = e.target;
        setAddressData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const newAddress = await createAddress({
                user_id: user.id,
                first_name: addressData.firstName,
                last_name: addressData.lastName,
                street_address: addressData.streetAddress,
                city: addressData.city,
                state: addressData.state,
                zip_code: addressData.zipCode,
                country: addressData.country,
                is_default: addresses.length === 0
            });
            
            setAddresses([...addresses, newAddress]);
            setSelectedAddress(newAddress);
            setShowAddressForm(false);
            setAddressData({
                firstName: "", lastName: "", streetAddress: "",
                city: "", state: "", zipCode: "", country: "Nigeria"
            });
            toast.success("Address added successfully!");
        } catch (error) {
            toast.error("Failed to add address");
        } finally {
            setLoading(false);
        }
    };

    const config = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
        tx_ref: `MC-${Date.now()}`,
        amount: parseFloat(total) + 500,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: user?.email || 'customer@example.com',
            phone_number: selectedAddress?.phone || '1234567890',
            name: user?.user_metadata?.name || `${selectedAddress?.first_name} ${selectedAddress?.last_name}` || 'Customer',
        },
        customizations: {
            title: 'MANIACRUMBLE',
            description: `Payment for ${number} item(s)`,
            logo: '/src/assets/LOGO.png',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const processPayment = () => {
        if (!user) {
            toast.error('Please login to continue');
            return;
        }

        if (!selectedAddress) {
            toast.error('Please select a shipping address');
            return;
        }

        setPaymentLoading(true);
        
        handleFlutterPayment({
            callback: async (response) => {
                if (response.status === 'successful') {
                    try {
                        const orderData = {
                            user_id: user.id,
                            total: parseFloat(total) + 500,
                            subtotal: parseFloat(total),
                            tax: 500.00,
                            status: 'processing',
                            payment_status: 'paid',
                            payment_intent_id: response.transaction_id,
                            shipping_address_id: selectedAddress.id
                        };

                        const order = await createOrder(orderData);
                        
                        const orderItems = items.map(item => ({
                            order_id: order.id,
                            product_id: item.id,
                            quantity: item.quantity,
                            price: item.price
                        }));

                        await createOrderItems(orderItems);
                        
                        clearCart();
                        setOrderSuccess(true);
                        toast.success('Order placed successfully!');
                    } catch (error) {
                        toast.error('Failed to create order');
                    }
                } else {
                    toast.error('Payment failed');
                }
                setPaymentLoading(false);
                closePaymentModal();
            },
            onClose: () => {
                setPaymentLoading(false);
            },
        });
    };

    if (orderSuccess) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-white px-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                >
                    <CheckCircle className="mx-auto mb-6 text-green-500" size={80} />
                    <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
                    <p className="text-xl text-gray-300 mb-8">Thank you for your purchase. Your order is being processed.</p>
                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={() => window.location.href = '/orders'}
                            className={buttonStyles.primary}
                        >
                            View Orders
                        </button>
                        <button 
                            onClick={() => window.location.href = '/shop'}
                            className={buttonStyles.secondary}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
                        SHOPPING CART
                    </h1>
                    <p className="text-xl text-gray-300">
                        {isEmpty ? "Your cart is empty" : `${number} item(s) in your cart`}
                    </p>
                </motion.div>

                {isEmpty ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-8xl mb-6">🛒</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
                        <p className="text-gray-400 mb-8 text-lg">Start adding some awesome products!</p>
                        <a href="/shop" className={buttonStyles.accent}>
                            Browse Products
                        </a>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`${modernCard.glass} p-6 hover:shadow-2xl transition-all`}
                                >
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-32 h-32 object-cover rounded-xl"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                                            <p className="text-gray-300 mb-4">{item.description}</p>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-3xl font-bold text-white">₦{item.price}</span>
                                                <span className="text-gray-400 capitalize px-3 py-1 bg-white/10 rounded-full text-sm">
                                                    {item.category}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-xl p-2">
                                                    <button
                                                        onClick={() => decrement(item.id)}
                                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg font-bold text-white transition-all"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-white font-bold text-xl w-12 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => increment(item.id)}
                                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg font-bold text-white transition-all"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl transition-all border border-red-500/30"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-gray-400 text-sm mb-1">Item Total</p>
                                            <p className="text-2xl font-bold text-white">
                                                ₦{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`${modernCard.glass} p-6 sticky top-24`}
                            >
                                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal ({number} items)</span>
                                        <span className="font-bold">₦{total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Shipping</span>
                                        <span className="font-bold">₦500.00</span>
                                    </div>
                                    <div className="border-t border-white/20 pt-4">
                                        <div className="flex justify-between text-white text-xl font-bold">
                                            <span>Total</span>
                                            <span>₦{(parseFloat(total) + 500).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!user) {
                                            toast.error('Please login to checkout');
                                            window.location.href = '/profile';
                                            return;
                                        }
                                        setcheckOut(true);
                                    }}
                                    disabled={paymentLoading}
                                    className={`${buttonStyles.accent} w-full`}
                                >
                                    {paymentLoading ? 'Processing...' : 'Proceed to Checkout'}
                                </button>

                                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                    <p className="text-green-400 text-sm text-center font-bold">
                                        🎉 Free shipping on orders over ₦2,500!
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {checkOut && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                            onClick={() => setcheckOut(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className={`${modernCard.glass} w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-white">Checkout</h2>
                                    <button
                                        onClick={() => setcheckOut(false)}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        <X size={32} />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <MapPin size={20} />
                                        Shipping Address
                                    </h3>
                                    
                                    {addresses.length > 0 ? (
                                        <div className="space-y-3 mb-4">
                                            {addresses.map((addr) => (
                                                <div
                                                    key={addr.id}
                                                    onClick={() => setSelectedAddress(addr)}
                                                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                                                        selectedAddress?.id === addr.id
                                                            ? 'bg-purple-500/20 border-2 border-purple-500'
                                                            : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
                                                    }`}
                                                >
                                                    <p className="text-white font-bold">
                                                        {addr.first_name} {addr.last_name}
                                                    </p>
                                                    <p className="text-gray-300 text-sm">
                                                        {addr.street_address}, {addr.city}, {addr.state}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}

                                    <button
                                        onClick={() => setShowAddressForm(!showAddressForm)}
                                        className={buttonStyles.secondary}
                                    >
                                        {showAddressForm ? 'Cancel' : '+ Add New Address'}
                                    </button>
                                </div>

                                {showAddressForm && (
                                    <motion.form
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        onSubmit={handleAddressSubmit}
                                        className="space-y-4 mb-6 p-4 bg-white/5 rounded-xl"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={addressData.firstName}
                                                onChange={handleAddressChange}
                                                placeholder="First Name"
                                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={addressData.lastName}
                                                onChange={handleAddressChange}
                                                placeholder="Last Name"
                                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                required
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="streetAddress"
                                            value={addressData.streetAddress}
                                            onChange={handleAddressChange}
                                            placeholder="Street Address"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="city"
                                                value={addressData.city}
                                                onChange={handleAddressChange}
                                                placeholder="City"
                                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="state"
                                                value={addressData.state}
                                                onChange={handleAddressChange}
                                                placeholder="State"
                                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={buttonStyles.primary}
                                        >
                                            {loading ? 'Saving...' : 'Save Address'}
                                        </button>
                                    </motion.form>
                                )}

                                <div className="border-t border-white/20 pt-6">
                                    <div className="mb-6">
                                        <div className="flex justify-between text-white mb-2">
                                            <span>Subtotal:</span>
                                            <span className="font-bold">₦{total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-white mb-2">
                                            <span>Shipping:</span>
                                            <span className="font-bold">₦500.00</span>
                                        </div>
                                        <div className="flex justify-between text-white text-2xl font-bold">
                                            <span>Total:</span>
                                            <span>₦{(parseFloat(total) + 500).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={processPayment}
                                        disabled={!selectedAddress || paymentLoading}
                                        className={`${buttonStyles.accent} w-full flex items-center justify-center gap-2`}
                                    >
                                        <CreditCard size={20} />
                                        {paymentLoading ? 'Processing Payment...' : 'Pay with Flutterwave'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
export default Cart;