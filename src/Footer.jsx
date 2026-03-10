import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { subscribeNewsletter } from "./database";
import { toast } from "react-hot-toast";
import { glassmorphism, buttonStyles } from "./theme";

function Footer(){
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);
        try {
            await subscribeNewsletter(email);
            toast.success("Successfully subscribed to newsletter!");
            setEmail("");
        } catch (error) {
            toast.error("Failed to subscribe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <footer id="Footer" className="relative mt-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 via-white to-gray-500" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`${glassmorphism.card} p-8 md:p-12 rounded-3xl mb-16 text-center`}
                >
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            Subscribe to receive exclusive offers and product updates
                        </p>
                        
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${buttonStyles.accent} flex items-center justify-center gap-2 whitespace-nowrap`}
                            >
                                <Send size={20} />
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            MANIACRUMBLE
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Premium streetwear for those who dare to be different.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-xl font-bold text-white mb-6">Navigation</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</a>
                            </li>
                            <li>
                                <a href="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</a>
                            </li>
                            <li>
                                <a href="/profile" className="text-gray-300 hover:text-white transition-colors">Account</a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-xl font-bold text-white mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="text-white mt-1 flex-shrink-0" size={20} />
                                <a href="mailto:maniacrumble@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                                    maniacrumble@gmail.com
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-white/10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2025 ManiaCrumble. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-center items-center mt-10">
                <p className="font-bold">© 2026 ManiaCrumble. All rights reserved.</p>
            </div>
        

        </footer>

    );
}

export default Footer;