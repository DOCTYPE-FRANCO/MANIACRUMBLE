import React from "react";
import Logo from "./assets/LOGO.png";

function Header() {
    return(
        <div className="w-full h-20 bg-black flex flex-row items-center">
            <div className="w-[70px] h-[70px]">
                <img src={Logo} className="w-[60px] h-[60px]"/>
            </div>
        </div>
    )
}
export default Header;