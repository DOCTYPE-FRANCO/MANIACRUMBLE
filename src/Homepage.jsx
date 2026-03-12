import React, {useState, useEffect} from "react";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import HeroSection from "./HeroSection.jsx";
import { getFeaturedProducts } from "./database.js";
import { theme, modernCard, buttonStyles, staggerContainer, staggerItem } from "./theme.js";
import { Star, Zap, ArrowRight, ChevronRight, TrendingUp, Award, Shield, Truck } from "lucide-react";

import BeanieModel from "../Products/BeanieModel.jpg"
import BlackSkullModel from "../Products/blackSkullcapmodel.jpg"
import BlackSkullModel2 from "../Products/BlackSkullCapmodel2.jpg"
import BlackSnapModel from "../Products/BlackSnapbackmodel.jpg"
import BlondeSnapModel from "../Products/BlondeSnapbackmodel.jpg"
import BlueSnapModel from "../Products/Bluesnapbackmodel.jpg"
import CamoSkullModel from "../Products/CamoSkullCapModel.jpg"
import OGSkullModel from "../Products/OGSkullcapmodel.jpg"
import PinkSkullModel from "../Products/PinkSkullCapmodel.jpg"
import SkullModels from "../Products/SkullCapModels.jpg"

function Homepage() {
    const [selectedPic, setSelectedPic] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const galleryImages = [
        BeanieModel, BlackSkullModel, BlondeSnapModel, BlackSkullModel2,
        PinkSkullModel, OGSkullModel, BlackSnapModel, BlueSnapModel,
        CamoSkullModel, SkullModels
    ];

    useEffect(() => {
        loadFeaturedProducts();
    }, []);

    const loadFeaturedProducts = async () => {
        try {
            const products = await getFeaturedProducts();
            setFeaturedProducts(products);
        } catch (error) {
            console.error('Failed to load featured products:', error);
        } finally {
            setLoading(false);
        }
    };

    function select(img){
        setSelectedPic(img);
    }

    return(
        <div className="md:mt-20 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/20 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse-soft" />

            <HeroSection />

            {/* Trust Indicators */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-6xl mx-auto px-4 mt-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`${modernCard.glass} p-6 text-center group hover:scale-105 transition-all`}>
                        <Shield className="mx-auto mb-3 text-white group-hover:text-gray-300" size={40} />
                        <h3 className="text-white font-bold text-lg mb-2">Secure Payment</h3>
                        <p className="text-gray-300 text-sm">100% secure transactions</p>
                    </div>
                    <div className={`${modernCard.glass} p-6 text-center group hover:scale-105 transition-all`}>
                        <Truck className="mx-auto mb-3 text-white group-hover:text-gray-300" size={40} />
                        <h3 className="text-white font-bold text-lg mb-2">Fast Delivery</h3>
                        <p className="text-gray-300 text-sm">Express shipping available</p>
                    </div>
                    <div className={`${modernCard.glass} p-6 text-center group hover:scale-105 transition-all`}>
                        <Award className="mx-auto mb-3 text-white group-hover:text-gray-300" size={40} />
                        <h3 className="text-white font-bold text-lg mb-2">Premium Quality</h3>
                        <p className="text-gray-300 text-sm">Guaranteed authenticity</p>
                    </div>
                </div>
            </motion.div>

            {/* Featured Products Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-24 mb-12 px-4"
            >
                <div className="inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full mb-4">
                    <TrendingUp className="text-white" size={20} />
                    <span className="text-gray-300 font-bold text-sm">TRENDING NOW</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                    Featured Collection
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Discover our handpicked selection of premium streetwear essentials
                </p>
            </motion.div>

            {/* Featured Products */}
            <div className="flex flex-col justify-center items-center md:flex-row gap-8 mt-20 px-4">
                {loading ? (
                    // Loading Skeletons
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="skeleton w-[280px] h-[380px] rounded-3xl" />
                    ))
                ) : (
                    featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -12, scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className={`${modernCard.glass} relative w-[280px] h-[380px] p-6 hover:shadow-2xl transition-all duration-500 group-hover:border-white/50`}>
                                {/* Product Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Star size={12} fill="currentColor" />
                                        FEATURED
                                    </div>
                                </div>

                                {/* Product Image */}
                                <div className="flex justify-center items-center w-full h-[180px] mb-6 relative overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-[140px] h-[140px] object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="text-center space-y-3">
                                    <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-300 font-medium">{product.description}</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-2xl font-bold text-white">₦{product.price}</span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Link to={`/product/${product.id}`} className="block mt-6">
                                    <button className={`${buttonStyles.accent} w-full flex items-center justify-center gap-2`}>
                                        <Zap size={16} />
                                        SHOP NOW
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Gallery Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-32 px-4"
            >
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full mb-4">
                        <Star className="text-white" size={20} />
                        <span className="text-gray-300 font-bold text-sm">LOOKBOOK</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
                        Style Gallery
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Explore our collection through real-world styling and photography
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <ChevronRight className="text-white animate-pulse" size={24} />
                        <span className="text-white font-bold text-lg">Swipe to explore</span>
                        <ChevronRight className="text-white animate-pulse" size={24} />
                    </div>
                </div>

                <div className="w-full flex justify-center items-center">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}  
                        pagination={{ clickable: true, dynamicBullets: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        navigation={true}
                        loop={true}
                        className="mySwiper w-full max-w-6xl"
                    >
                        {galleryImages.map((image, index) => (
                            <SwiperSlide key={index} className="!w-[350px] !h-[400px]">
                                <div className="relative group cursor-pointer h-full" onClick={() => select(image)}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl z-10" />
                                    <img 
                                        src={image} 
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 z-20">
                                        <div className="glass-card p-3 rounded-xl">
                                            <p className="text-white font-bold text-center">Tap to view full size</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </motion.div>

            {/* Image Modal */}
            {selectedPic && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    onClick={() => setSelectedPic(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative max-w-4xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedPic} 
                            alt="Selected" 
                            className="w-full h-full object-contain rounded-2xl shadow-2xl"
                        /> 
                        <button 
                            onClick={() => setSelectedPic(null)} 
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
export default Homepage;