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

import BeanieModel from "/Products/BeanieModel.jpg"
import BlackSkullModel from "/Products/blackSkullcapmodel.jpg"
import BlackSkullModel2 from "/Products/BlackSkullCapmodel2.jpg"
import BlackSnapModel from "/Products/BlackSnapbackmodel.jpg"
import BlondeSnapModel from "/Products/BlondeSnapbackmodel.jpg"
import BlueSnapModel from "/Products/Bluesnapbackmodel.jpg"
import CamoSkullModel from "/Products/CamoSkullCapModel.jpg"
import OGSkullModel from "/Products/OGSkullcapmodel.jpg"
import PinkSkullModel from "/Products/PinkSkullCapmodel.jpg"
import SkullModels from "/Products/SkullCapModels.jpg"

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