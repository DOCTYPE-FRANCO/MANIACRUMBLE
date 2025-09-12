import React from "react";
import { Link } from "react-router-dom";
function Navbar(){
    return(
        <div>
            <ul className="flex gap-10">
                <li className="text-white font-bold hover:text-gray-600"><Link>Home</Link></li>
                <li className="text-white font-bold hover:text-gray-600"><Link>Shop</Link></li>
                <li className="text-white font-bold hover:text-gray-600"><Link>Contact</Link></li>
            </ul>
        </div>
    );
}

export default Navbar