import React from "react";
import { Link } from "react-router-dom";
function Navbar(){
    return(
        <div className="flex justify-center items-center ">
            <ul className="md:flex gap-10 hidden">
                <li className="text-white font-bold hover:text-gray-600"><Link to="/">Home</Link></li>
                <li className="text-white font-bold hover:text-gray-600"><Link to="/shop">Shop</Link></li>
                <a href="#Footer">
                    <li className="text-white font-bold hover:text-gray-600"><Link>Contact</Link></li>
                </a>
            </ul>
        </div>
    );
}

export default Navbar