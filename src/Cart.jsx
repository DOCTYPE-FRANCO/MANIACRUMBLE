import React, {useContext, useState, useEffect} from "react";
import { CartContext }  from "./CartContext";
import { ClipLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { X } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

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
                            <button onClick={() => setcheckOut(true)} className=" text-black bg-white font-bold p-3 md:p-2 text-center rounded-xl  hover:scale-110 active:bg-gray-800 transition-transform duration-300">PROCEED TO PAY</button>
                        </div>
                    </div>
                </div>
                
            </div>

            <AnimatePresence mode="wait">
                {checkOut && (
                    <>
                    {/* Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setcheckOut(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="pt-3 flex flex-col items-center fixed w-[400px] h-[850px] md:w-[850px] md:h-[440px] bg-white top-12 md:top-20 left-1/2 -translate-x-1/2 p-1 rounded-md z-50"
                    >
                        {/* HEADER */}
                        <div className="w-full flex justify-between items-center">
                        <p className="text-center md:text-2xl font-extrabold text-black ml-5 ">
                            {location ? "Make payment" : "Where are you located?"}
                        </p>

                        <X
                            onClick={() => setcheckOut(false)}
                            size={34}
                            className="hover:scale-110 transition-transform cursor-pointer pr-2"
                            strokeWidth={2}
                        />
                        </div>

                        {/* BODY */}
                        <div className="flex flex-col md:flex-row gap-4 mt-5 transition-all duration-300">
                        
                        {/* LEFT SIDE – LOCATION FORM */}
                        <div>
                            {loading && (
                            <div className="flex justify-center items-center md:mr-60">
                                <ClipLoader />
                            </div>
                            )}

                            {!loading && !location && (
                            <div className="flex flex-col border border-black rounded-xl p-4">
                                <p className="font-bold ml-2">Add Shipping Location</p>

                                <form
                                onSubmit={handleSubmit}
                                className="mt-5 flex flex-col gap-3 ml-2"
                                >
                                <div className="flex flex-col md:flex-row gap-3">
                                    <label className="flex flex-col">
                                    First Name:
                                    <input
                                        name="FirstName"
                                        value={Ldata.FirstName}
                                        type="text"
                                        placeholder="e.g Uche"
                                        onChange={handleChange}
                                        className="w-[200px] h-[30px] border border-black pl-2"
                                    />
                                    </label>

                                    <label className="flex flex-col">
                                    Last Name:
                                    <input
                                        name="LastName"
                                        value={Ldata.LastName}
                                        type="text"
                                        placeholder="e.g Abu"
                                        onChange={handleChange}
                                        className="w-[200px] h-[30px] border border-black pl-2"
                                    />
                                    </label>
                                </div>

                                <label className="flex flex-col">
                                    Full Street Address:
                                    <input
                                    name="StreetAddress"
                                    value={Ldata.StreetAddress}
                                    type="text"
                                    placeholder="e.g 12, Mope Road, Sangotedo, Ajah"
                                    onChange={handleChange}
                                    className="w-[300px] h-[30px] border border-black pl-2"
                                    />
                                </label>

                                <label className="flex flex-col">
                                    State:
                                    <input
                                    name="State"
                                    value={Ldata.State}
                                    type="text"
                                    placeholder="e.g Lagos"
                                    onChange={handleChange}
                                    className="w-[200px] h-[30px] border border-black pl-2"
                                    />
                                </label>

                                <button className="bg-black text-white font-semibold p-2 rounded-2xl hover:bg-gray-700 active:bg-gray-900 transition">
                                    Submit
                                </button>
                                </form>
                            </div>
                            )}
                        </div>

                        {/* RIGHT SIDE – CHECKOUT SUMMARY */}
                        <div className="flex flex-col gap-7 border py-3 items-center w-[300px] border-black rounded-2xl">
                            <p className="text-black font-extrabold text-2xl p-5">CheckOut</p>

                            {!isEmpty && (
                            <>
                                <p className="text-black font-bold">
                                Sub-Total ({number} Items): ${total.toFixed(2)}
                                </p>

                                <p className="text-black font-bold">Tax: $10.00</p>

                                <p className="text-black text-2xl font-bold px-10">
                                    Total: ${parseFloat(total.toFixed(2)) + 10}
                                </p>

                                <button className="text-white bg-black font-bold p-3 rounded-xl hover:bg-gray-600 active:bg-gray-900 transition">
                                PROCEED TO PAY
                                </button>
                            </>
                            )}
                        </div>
                        </div>
                    </motion.div>
                    </>
                )}
                </AnimatePresence>

            <Toaster position="top-right"/>
        </div>
    );
}
export default Cart;