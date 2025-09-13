import React from "react";
import { Link } from "react-router-dom";
function Navbar(){
    return(
        <div className="flex justify-center items-center ">
            <ul className="md:flex gap-10 hidden">
                <li className="text-white font-bold hover:text-gray-600"><Link>Home</Link></li>
                <li className="text-white font-bold hover:text-gray-600"><Link to="/shop">Shop</Link></li>
                <li className="text-white font-bold hover:text-gray-600"><Link>Contact</Link></li>
            </ul>
        </div>
    );
}

export default Navbar