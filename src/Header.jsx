import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, User, Menu, X, Store } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Logo from "./assets/LOGO.png";
import { glassmorphism } from "./theme";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();
    const { number } = useContext(CartContext);

    return(
        <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-20 bg-black/95 backdrop-blur-lg border-b border-white/20 flex flex-row justify-between items-center fixed top-0 z-50"
        >
            {/* Logo */}
            <Link to="/">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pl-6 w-[80px] h-[80px] relative"
                >
                    <img src={Logo} className="w-[80px] h-[80px] relative z-10 hover:drop-shadow-lg transition-all duration-300" alt="MANIACRUMBLE Logo"/>
                </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 relative group">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/shop" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 relative group">
                    Shop
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
                <a href="#Footer" className="text-white font-bold hover:text-gray-300 transition-colors duration-300 relative group">
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex flex-row gap-3 pr-5 items-center">
                {/* Wishlist */}
                {user && (
                    <Link to="/wishlist">
                        <motion.div 
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`${glassmorphism.card} flex justify-center items-center w-[45px] h-[45px] rounded-full hover:shadow-lg transition-all duration-300 group`}
                        >
                            <Heart className="w-[20px] h-[20px] text-white group-hover:text-gray-300 transition-colors duration-300"/>
                        </motion.div>
                    </Link>
                )}

                {/* Shop */}
                <Link to="/shop">
                    <motion.div 
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${glassmorphism.card} flex justify-center items-center w-[45px] h-[45px] rounded-full hover:shadow-lg transition-all duration-300 group`}
                    >
                        <Store className="w-[20px] h-[20px] text-white group-hover:text-gray-300 transition-colors duration-300"/>
                    </motion.div>
                </Link>

                {/* Cart */}
                <Link to="/cart">
                    <motion.div 
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${glassmorphism.card} relative flex justify-center items-center w-[45px] h-[45px] rounded-full hover:shadow-lg transition-all duration-300 group`}
                    >
                        <ShoppingCart className="w-[20px] h-[20px] text-white group-hover:text-gray-300 transition-colors duration-300"/>
                        {number > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                            >
                                {number}
                            </motion.span>
                        )}
                    </motion.div>
                </Link>

                {/* Profile */}
                <Link to="/profile">
                    <motion.div 
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${glassmorphism.card} flex justify-center items-center w-[45px] h-[45px] rounded-full hover:shadow-lg transition-all duration-300 group`}
                    >
                        <User className="w-[20px] h-[20px] text-white group-hover:text-gray-300 transition-colors duration-300"/>
                    </motion.div>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 md:hidden"
                >
                    <nav className="flex flex-col space-y-4 p-6">
                        <Link 
                            to="/" 
                            className="text-white font-bold hover:text-gray-300 transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/shop" 
                            className="text-white font-bold hover:text-gray-300 transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <a 
                            href="#Footer" 
                            className="text-white font-bold hover:text-gray-300 transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </a>
                        {user && (
                            <>
                                <Link 
                                    to="/wishlist" 
                                    className="text-white font-bold hover:text-gray-300 transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Wishlist
                                </Link>
                                <Link 
                                    to="/orders" 
                                    className="text-white font-bold hover:text-gray-300 transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Orders
                                </Link>
                            </>
                        )}
                    </nav>
                </motion.div>
            )}
        </motion.div>
    )
}
export default Header;
