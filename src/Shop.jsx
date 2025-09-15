import React from "react";
import RedSnap from "../Products/RedSnapback.jpg"
import BlackSnap from "../Products/BlackSnapback.jpg"
import BlondeSnap from "../Products/BlondeSnapbackpic.jpg" 
import Beanie from "../Products/Beanie.jpg"
import BeanieM from "../Products/BeanieModel.jpg"
import BeanieM2 from "../Products/BeanieModel (2).jpg"
import BlackWaveCap from "../Products/BlackWaveCap.jpg"
import CamoWave from "../Products/CamoSkullCap.jpg"
import PinkWave from "../Products/PinkSkullCap.jpg"
import GrayWave from "../Products/GraySkullCap.jpg"
import OGSkullCap from "../Products/OGSkullcap.jpg"
import OGSkullCapPink from "../Products/SkullCappink.jpg"
function Shop(){
    const snapbacks = [
        {
            id: 1,
            name: "Black SnapBack",
            description: "SnapBack Hat.",
            price: 19.99,
            image: BlackSnap
        },
        {
            id: 2,
            name: "Red SnapBack",
            description: "SnapBack Hat.",
            price: 19.99,
            image: RedSnap
        },
        {
            id: 3,
            name: "Blonde SnapBack",
            description: "SnapBack Hat.",
            price: 19.99,
            image: BlondeSnap
        }
    ]

    const beanies = [
        {
            id: 1,
            name: "Black Beanie",
            description: "Don't Think, Jump Editions.",
            price: 19.99,
            image: Beanie
        },
        {
            id: 2,
            name: "Beanie",
            description: "S....",
            price: 19.99,
            image: BeanieM
        },
        {
            id: 3,
            name: "Blonde SnapBack",
            description: "A....",
            price: 19.99,
            image: BeanieM2
        }
    ]


    const waveCaps = [
        {
            id: 1,
            name: "Black Wave Cap",
            description: "Wave Cap Hat.",
            image: BlackWaveCap,
            price: 14.99,
        },
        {
            id: 2,
            name: "Camo Wave Cap",
            description: "Wave Cap .",
            image: CamoWave,
            price: 14.99,
        },
        
        {
            id: 3,
            name: "Pink Wave Cap",
            description: "Wave Cap .",
            image: PinkWave,
            price: 14.99,
        },

        {
            id: 4,
            name: "Gray Wave Cap",
            description: "Wave Cap .",
            image: GrayWave,
            price: 14.99,
        },

        {
            id: 5,
            name: "OG Wave Cap",
            description: "Limited Edition Wave Cap .",
            image: OGSkullCap,
            price: 14.99,
        },

        {
            id: 6,
            name: "OG Wave Cap (Pink)",
            description: "Limited Edition Wave Cap .",
            image: OGSkullCapPink,
            price: 14.99,
        },



    ]

    return(
        <div className="pt-20">
            <h1 className="text-4xl text-white font-extrabold text-center mt-10">Shop Our Products</h1>
            <div className="  border-0 border-white md:hover:border transition-all duration-300 mt-10 rounded-3xl w-[90%] md:w-[70%] md:h-[500px] bg-black flex flex-col justify-center items-center m-auto">
                <h2 className="text-2xl font-bold text-white text-center">Snapback Hats</h2>
                <div className="flex flex-col gap-3 md:flex-row justify-center items-center ">
                    {snapbacks.map((snapback) =>(
                        <div 
                            key={snapback.id}
                            className="flex flex-col justify-center items-center bg-white w-[250px] h-[370px] rounded-4xl m-5"
                        >
                            <div>
                                <img src={snapback.image} alt={snapback.name} className="w-[150px] rounded-2xl mt-5"/>
                            </div>
                            <div>
                                <p className="text-2xl font-mono font-extrabold">{snapback.name}</p>
                            </div>
                            <div>
                                <p className="font-bold font-mono text-center text-gray-600">{snapback.description}</p>
                            </div>
                            <div className="mb-3">
                                <p className="font-bold font-mono">${snapback.price}</p>
                            </div>

                            <button className="bg-black w-[130px] h-[30px] text-white rounded-2xl font-bold hover:bg-gray-500 active:bg-gray-500 active:text-black">Add to Cart</button>

                        </div>
                    ))}
                </div>
            </div>

            <div className="  border-0 border-white md:hover:border transition-all duration-300 mt-10 rounded-3xl w-[90%] md:w-[70%] md:h-[850px] bg-black flex flex-col justify-center items-center m-auto">
                <h2 className="text-2xl font-bold text-white text-center">WaveCaps </h2>
                <div className=" flex flex-col md:grid md:grid-cols-3  justify-center items-center ">
                    {waveCaps.map((waveCap) =>(
                        <div 
                            key={waveCap.id}
                            className="flex flex-col justify-center items-center bg-white w-[250px] h-[370px] rounded-4xl m-5"
                        >
                            <div>
                                <img src={waveCap.image} alt={waveCap.name} className="w-[150px] rounded-2xl mt-5"/>
                            </div>
                            <div>
                                <p className="text-2xl font-mono font-extrabold">{waveCap.name}</p>
                            </div>
                            <div>
                                <p className="font-bold font-mono text-center text-gray-600">{waveCap.description}</p>
                            </div>
                            <div className="mb-3">
                                <p className="font-bold font-mono">${waveCap.price}</p>
                            </div>

                            <button className="bg-black w-[130px] h-[30px] text-white rounded-2xl font-bold hover:bg-gray-500 active:bg-gray-500 active:text-black">Add to Cart</button>

                        </div>
                    ))}
                </div>
            </div>

            <div className="  border-0 border-white md:hover:border transition-all duration-300 mt-10 rounded-3xl w-[90%] md:w-[70%] md:h-[500px] bg-black flex flex-col justify-center items-center m-auto min-h-screen">
                <h2 className="text-2xl font-bold text-white text-center">Beanies</h2>
                <div className="flex flex-col md:flex-row justify-center items-center ">
                    {beanies.map((beanie) =>(
                        <div 
                            key={beanie.id}
                            className="flex flex-col justify-center items-center bg-white w-[250px] h-[370px] rounded-4xl m-5"
                        >
                            <div>
                                <img src={beanie.image} alt={beanie.name} className="w-[150px] rounded-2xl mt-5"/>
                            </div>
                            <div>
                                <p className="text-2xl font-mono font-extrabold">{beanie.name}</p>
                            </div>
                            <div>
                                <p className="font-bold font-mono text-center text-gray-600">{beanie.description}</p>
                            </div>
                            <div className="mb-3">
                                <p className="font-bold font-mono">${beanie.price}</p>
                            </div>

                            <button className="bg-black w-[130px] h-[30px] text-white rounded-2xl font-bold hover:bg-gray-500 active:bg-gray-500 active:text-black">Add to Cart</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;