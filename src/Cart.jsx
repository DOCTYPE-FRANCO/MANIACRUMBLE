import React, {useContext} from "react";
import { CartContext }  from "./CartContext";

function Cart(){

    const {items} = useContext(CartContext);
    

    return(
        <div className="flex flex-col justify-center items-center  w-full mt-20">
            <h1 className="text-4xl text-white font-extrabold mb-5">Cart</h1>

            <div className="flex flex-row gap-20">
                <div className="flex flex-col justify-center items-center ">
                    <div>
                        <ul className="flex flex-col  gap-10">
                            {items.length === 0 ? (
                                <p className="text-white font-bold text-2xl p-5">Your cart is empty</p>
                            ) : 
                            
                            items.map((item) => (
                                <div key={item.id} className="flex md:flex-row border border-white">
                                    <div>
                                        <img src={item.image} alt={item.name} className="w-[250px] rounded-2xl m-5"/>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-5 m-5">
                                        <div className="flex justify-center items-center">
                                            <p className="text-white font-extrabold text-3xl text-center">{item.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-2xl text-center">${item.price}</p>
                                        </div>
                                        <div>
                                            <button className="bg-white w-[70px] h-[30px] font-bold rounded-full hover:bg-gray-600">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center border border-white ">
                    <div>
                        <p className="text-white font-bold text-2xl p-5">CheckOut</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;