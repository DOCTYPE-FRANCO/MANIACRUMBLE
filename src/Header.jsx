import React from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/LOGO.png";
import User from "./assets/User.svg"
import Cart from "./assets/Cart.svg"
import Shop from "./assets/Shop.svg";
import Navbar from "./Navbar";

function Header() {
    return(
        <div className="w-full h-20 bg-black flex flex-row justify-between items-center fixed top-0 z-50">
            <Link to="/">
                <div className="pl-6 w-[80px] h-[80px]">
                    <img src={Logo} className="w-[80px] h-[80px]"/>
                </div>
            </Link>
            <Navbar />
            <div className="flex flex-row gap-4 pr-5">
                <Link to="/shop">
                    <div className="flex justify-center items-center w-[40px] h-[40px] bg-white rounded-full hover:bg-gray-600">
                        <img src={Shop}  className="w-[20px] h-[20px]"/>
                    </div>
                </Link>

                <Link to="/cart">
                    <div className="flex justify-center items-center w-[40px] h-[40px] bg-white rounded-full hover:bg-gray-600">
                        <img src={Cart}  className="w-[20px] h-[20px]"/>
                    </div>
                </Link>

                <div className="flex justify-center items-center w-[40px] h-[40px] bg-white rounded-full hover:bg-gray-600">
                    <img src={User} className="w-[20px] h-[20px]"/>
                </div>
                
            </div>
        </div>
    )
}
export default Header;