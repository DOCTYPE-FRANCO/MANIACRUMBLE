import React from "react";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import HeroSection from "./Herosection";
import Beanie from "../Products/Beanie.jpg"
import BlackWaveCap from "../Products/BlackWaveCap.jpg"
import BlackSnapBack from "../Products/BlackSnapback.jpg"
import OGSkullCap from "../Products/OGSkullcapmodels.jpg"

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
        </div>
    );
}
export default Homepage;