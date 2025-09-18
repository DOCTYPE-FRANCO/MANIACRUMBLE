import React, {useContext, useState} from "react";
import { CartContext }  from "./CartContext";

function Cart(){
    
    const {items, removeFromCart, increment, decrement, number,isEmpty, total} = useContext(CartContext);

    


    

    return(
        <div className="flex flex-col justify-center items-center  w-full mt-20 overflow-hidden">
            <h1 className="text-4xl text-white font-extrabold mb-5">Cart</h1>

            <div className="flex flex-row  gap-20">
                <div className="flex flex-col md:flex-row gap-20 justify-center ">
                    <div className="flex flex-col justify-center items-center ">
                        <div className="flex flex-col gap-10">
                            {items.length === 0 ? (
                                <p className="text-white font-bold text-2xl p-5">Your cart is empty</p>
                            ) : 
                            
                            items.map((item) => (
                                <div key={item.id} className="flex flex-row border border-white w-[390px] md:w-[500px] rounded-2xl gap-5 hover:scale-105 transition-all duration-300">
                                    <div>
                                        <img src={item.image} alt={item.name} className="w-[200px] sm:w-[150px] rounded-2xl m-5"/>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-5 m-5">
                                        <div className="flex justify-center items-center">
                                            <p className="text-white font-extrabold text-3xl text-center">{item.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-2xl text-center">${item.price}</p>
                                        </div>
                                        <div className=" flex flex-row gap-4">
                                            <button className="text-black bg-white font-bold p-1 md:p-2 text-center rounded-xl  hover:bg-gray-600 active:bg-gray-900">Buy Now</button>
                                            <button onClick={() => removeFromCart(item.id)} className="bg-white  font-bold rounded-xl p-1 md:p-2 text-center hover:bg-gray-600 active:bg-gray-900">Remove</button>
                                            
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <button onClick={()=>increment(item.id)} className="text-black bg-white text-2xl font-bold  px-3 text-center h-[40px] hover:bg-gray-600 active:bg-gray-900">+</button>
                                            <p className="justify-center text-white text-center border border-white font-bold  p-2 inline-block w-[40px] h-[40px]">{item.quantity}</p>
                                            <button onClick={()=>decrement(item.id)} className="text-black bg-white text-2xl font-bold p-1 px-3 text-center h-[40px] hover:bg-gray-600 active:bg-gray-900hover:bg-gray-600 active:bg-gray-900">-</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-7 border-t items-center w-[500px] border-white rounded-2xl md:h-[500px] ">
                        <div>
                            <p className="text-white font-extrabold text-3xl p-5">CheckOut</p>
                        </div>

                        <div className={isEmpty? "hidden" : ""}>
                            <p className="text-white text-2xl font-bold">Sub-Total({number} Items): ${total.toFixed(2)}</p>
                        </div>

                        <div className={isEmpty? "hidden" : ""}>
                            <p className="text-white text-2xl font-bold">Tax: $10.00</p>
                        </div>

                        <div className={isEmpty? "hidden" : ""}>
                            <p className="text-black bg-white text-3xl font-bold px-10">Total:  ${parseFloat(total.toFixed(2)) +  10}</p>
                        </div>

                        <div className={isEmpty? "hidden  mt-16" : ""}>
                            <button className=" text-black bg-white font-bold p-3 md:p-2 text-center rounded-xl  hover:bg-gray-600 active:bg-gray-900">PROCEED TO PAY</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Cart;