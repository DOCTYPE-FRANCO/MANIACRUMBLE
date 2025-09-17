import React, {useContext, useState} from "react";
import { CartContext }  from "./CartContext";

function Cart(){
    const [count, setCount] = useState(1)
    const {items, removeFromCart} = useContext(CartContext);



    function increment(){
        setCount(count + 1);
    }

    function decrement(){
        if(count > 1){
            setCount(count - 1);
        }
    }
    

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
                                            <button onClick={increment} className="text-black bg-white text-2xl font-bold  px-3 text-center h-[40px] hover:bg-gray-600 active:bg-gray-900">+</button>
                                            <p className="justify-center text-white text-center border border-white font-bold  p-2 inline-block w-[40px] h-[40px]">{count}</p>
                                            <button onClick={decrement} className="text-black bg-white text-2xl font-bold p-1 px-3 text-center h-[40px] hover:bg-gray-600 active:bg-gray-900hover:bg-gray-600 active:bg-gray-900">-</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col border  items-center w-[500px] border-white ">
                        <div>
                            <p className="text-white font-bold text-2xl p-5">CheckOut</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Cart;