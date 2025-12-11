import React from "react";
import HeroImg from "./assets/hero.jpg";
import Typewriter from 'typewriter-effect';
import {motion} from "framer-motion";

function HeroSection() {
    return (
        <div className="flex flex-col md:flex-row md:gap-[150px] gap-10 justify-center items-center mt-32 md:mt-2">
            <div className="flex flex-col justify-center gap-4  items-center hover:scale-105 transition-transform duration-500">
                <p className="text-4xl md:text-5xl text-gray-500 font-bold ">
                    <Typewriter 
                        options={{
                            strings: ["Don't think. Jump!"],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </p>
                <p className=" text-4xl md:text-6xl text-white font-extrabold">MANIACRUMBLE</p>
            </div>
            <div className="w-[300px] justify-center pt-10 hover:scale-105 transition-transform duration-500">
                <motion.img
                    src={HeroImg}
                    className="w-[700px] rounded-r-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                />
            </div>
        </div>
    );
}
export default HeroSection;