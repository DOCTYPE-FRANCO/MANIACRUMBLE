import React from "react";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import 'swiper/css';
import HeroSection from "./HeroSection";
import Beanie from "../Products/Beanie.jpg"
import BlackWaveCap from "../Products/BlackWaveCap.jpg"
import BlackSnapBack from "../Products/BlackSnapback.jpg"
import OGSkullCap from "../Products/OGSkullcapmodels.jpg"

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
    const productdisp = [
        {
            id: 1, 
            productName: "BEANIE",
            productImg: Beanie,
            productDesc: "--Black--",
        },
         {
            id: 2, 
            productName: "WAVE CAP",
            productImg: BlackWaveCap,
            productDesc: "--Black--",
        },
        {
            id: 3, 
            productName: "SNAPBACK",
            productImg: BlackSnapBack,
            productDesc: "--Black--",
        }, 
        {
            id: 4, 
            productName: "OG SkullCap",
            productImg: OGSkullCap,
            productDesc: "First Edition",
        },
    ]
    return(
        <div className="md:mt-20 overflow-hidden">
            <HeroSection />

            <p className="text-white text-center text-3xl font-bold mt-30">--10% DISCOUNT SALES--</p>

            <div className="flex flex-col justify-center items-center md:flex-row gap-4 mt-20">
                {productdisp.map((product) => (
                    <motion.div
                        key={product.id}
                        className="flex flex-col gap-3 justify-center items-center bg-white w-[250px] h-[420px] rounded-4xl relative bottom-0 hover:bottom-6 transition-all duration-500"
                        initial={{opacity:0, y:50}}
                        animate={{opacity:1, y:0}}
                        transition={{duration:1}}
                    >
                        <div className=" flex justify-center items-center w-[250px]  h-[250px] ">
                            <img src={product.productImg} alt=""  className="w-[150px] rounded-2xl"/>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-3">
                            <p className="font-extrabold text-2xl">{product.productName}</p>
                            <p className="text-gray-500 font-bold">{product.productDesc}</p>
                        </div>

                        <Link to="/shop">
                            <button className="bg-black text-white w-32 h-10 font-bold rounded-full hover:bg-gray-600 transition-all duration-500">SHOP NOW</button>
                        </Link>
                        
                    </motion.div>
                ))}
                
            </div>
            <p className="text-white font-bold text-3xl mt-30 text-center">SWIPE 👉👉👉</p>
            <div className="w-full flex justify-center items-center">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    modules={[Autoplay, Pagination, Navigation]}  
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    navigation={true}
                    loop={true}
                    className="mySwiper w-full max-w-6xl mt-10"
                >
                    <SwiperSlide>
                    <img src={BeanieModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={BlackSkullModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={BlondeSnapModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={BlackSkullModel2} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={PinkSkullModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={OGSkullModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={BlackSnapModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={BlueSnapModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={CamoSkullModel} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>

                    <SwiperSlide>
                    <img src={SkullModels} alt="" className="w-[500px] md:w-[300px] rounded-2xl" />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
}
export default Homepage;