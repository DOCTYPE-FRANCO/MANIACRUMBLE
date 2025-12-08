import React, {useContext, useState, useEffect} from "react";
import { CartContext }  from "./CartContext";
import { ClipLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { X } from "lucide-react";

function Cart(){
    
    const {items, removeFromCart, increment, decrement, number,isEmpty, total} = useContext(CartContext);

    const [Ldata,setLdata] = useState({
        FirstName: "",
        LastName: "",
        StreetAddress: "",
        State: ""
    });

    const [checkOut, setcheckOut] = useState(false);
    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState(false);

    useEffect(() => {
        if (loading){
            const timer = setTimeout(() => {
                setLoading(false)
            }, 3000 )

            return () => clearTimeout(timer);
        }

        
    }, [loading])

    function handleChange(e){
        const {name, value} = e.target;
        setLdata(prev => ({
            ...prev,
            [name] : value
        }));
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true);
        if(Ldata.FirstName !== ""){
            toast.success("Location Added :)")
            setLocation(true)
        }
        
        setLdata({FirstName: "", LastName: "", StreetAddress: "", State: ""})

        
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
                            <button onClick={() => setcheckOut(true)} className=" text-black bg-white font-bold p-3 md:p-2 text-center rounded-xl  hover:bg-gray-600 active:bg-gray-900">PROCEED TO PAY</button>
                        </div>
                    </div>
                </div>
                
            </div>

            <div className={checkOut ? "flex flex-col  items-center fixed w-[400px] h-[820px] md:w-[850px] md:h-[420px] bg-white top-14 md:top-24 left-1/2 transform -translate-x-1/2 p-3 rounded-xs z-50 py-4 md:py-0" : "hidden"}>
                <div className="w-full flex flex-row justify-between">
                    <p className="text-center md:text-2xl font-extrabold text-black ml-5">{location ? 'Make payment' : `Where are you located?` }</p>

                    <X onClick={() => setcheckOut(false)} />
                </div>

               

                <div className="flex flex-col items-center md:flex-row gap-4 mt-5 transition-all duration-300">                   
                    <div className="">
                        {loading && (
                            <div className="flex justify-center items-center md:mr-60 ">
                                <ClipLoader />
                                
                            </div>
                            
                        )}

                        {!loading && (
                            <div className={location ? 'hidden' : `flex flex-col border border-black rounded-xl` }>
                                <div className="ml-6 font-bold">Add Shipping Location</div>

                                
                                <form  onSubmit={handleSubmit} className="mt-5 md:ml-6 flex flex-col gap-2 p-5 md:p-2 ">
                                    <div className="flex flex-col md:flex-row gap-2 ">
                                        <label className="flex flex-col">
                                            First Name:
                                            <input 
                                                name="FirstName"
                                                value={Ldata.FirstName}
                                                type="text"
                                                className="w-[200px] h-[30px] border border-black pl-2"
                                                placeholder=" e.g Uche"
                                                onChange={handleChange}
                                            />
                                        </label>

                                        <label className="flex flex-col">
                                            Last Name:
                                            <input 
                                                name="LastName"
                                                value={Ldata.LastName}
                                                type="text"
                                                className="w-[200px] h-[30px] border border-black pl-2"
                                                onChange={handleChange}
                                                placeholder="e.g Abu"
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <label className="flex flex-col">
                                            Full Street Address:
                                            <input 
                                                name="StreetAddress"
                                                value={Ldata.StreetAddress}
                                                type="text"
                                                className="w-[300px] h-[30px] border border-black pl-2"
                                                onChange={handleChange}
                                                placeholder="e.g 12, mope road, Sangotedo, Ajah"
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <label className="flex flex-col">
                                            State:
                                            <input 
                                                name="State"
                                                value={Ldata.State}
                                                type="text"
                                                className="w-[200px] h-[30px] border border-black pl-2"
                                                onChange={handleChange}
                                                placeholder="e.g Lagos"
                                            />
                                        </label>
                                    </div>

                                    
                                    <div className="flex justify-center ">
                                        <button className="bg-black text-white hover:bg-gray-700 active:bg-gray-900 font-semibold p-2 rounded-2xl transition-all duration-300">Submit</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-7 border py-3 items-center w-[300px] border-black rounded-2xl ">
                        <div>
                            <p className="text-black font-extrabold text-2xl p-5">CheckOut</p>
                        </div>

                        <div className={isEmpty? "hidden" : ""}>
                            <p className="text-black font-bold">Sub-Total({number} Items): ${total.toFixed(2)}</p>
                        </div>

                        <div className={isEmpty? "hidden" : ""}>
                            <p className="text-black  font-bold">Tax: $10.00</p>
                        </div>

                        <div className={isEmpty? "hidden" : ""}>
                            <p className="text-black bg-white text-2xl font-bold px-10">Total:  ${parseFloat(total.toFixed(2)) +  10}</p>
                        </div>

                        <div className={isEmpty? "hidden  mt-16" : ""}>
                            <button className=" text-white bg-black font-bold p-3 md:p-2 text-center rounded-xl  hover:bg-gray-600 active:bg-gray-900 transition-all duration-300">PROCEED TO PAY</button>
                        </div>
                    </div>
                </div>

                
                

            </div>
            <Toaster position="top-right"/>
        </div>
    );
}
export default Cart;