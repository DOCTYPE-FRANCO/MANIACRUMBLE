import React from "react";
import HeroImg from "./assets/hero.jpg"
import Typewriter from 'typewriter-effect';
function Herosection(){
    return(
        <div className="flex flex-row gap-[150px] justify-center items-center">
            <div className="flex flex-col justify-center gap-4">
                <p className="text-5xl text-gray-500 font-bold ">
                    <Typewriter 
                        options={{
                            strings: ["Don't think. Jump !"],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </p>
                <p className="text-6xl text-white font-extrabold">MANIACRUMBLE</p>
            </div>
            <div className="w-[300px]  justify-center pt-10">
                <img src={HeroImg}  className="w-[700px] rounded-r-full"/>
            </div>
        </div>
    );
}
export default Herosection