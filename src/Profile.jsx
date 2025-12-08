import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Logo from "./assets/LOGO.png"

function Profile(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    })

    const [hasAccount , setHasAccount] = useState(false);
    const [warning, setWarning] = useState(false);
    

    function handleChange(event){
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData, 
            [name]: value
        }));
    }

    async function handleSignup(e){
        e.preventDefault();
        setLoading(true);
        if(formData.Password  !== formData.ConfirmPassword){
            alert("PASSWORDS DON'T MATCH");
            setLoading(false);
            return;
        }

        

        if(formData.Password.length < 8){
            setWarning(true);
            setLoading(false);
            return;
        }
        try{
            const response = await axios.post(`${BASE_URL}/api/signup`, {
                name: formData.Name,
                email : formData.Email,
                password: formData.Password
            });

            if(response.status === 200){
                setHasAccount(true)
            }else{
                alert("Somthing Went Wrong, Try again later")
            }
            
        }catch(error) {
            console.log(error);
        }
        setLoading(false);
        setWarning(false);
        
    }

    async function handleLogin(e){
        e.preventDefault();
        setLoading(true);
        
        try{
            const response = await axios.post(`${BASE_URL}/api/login`, {
                email: formData.Email,
                password: formData.Password
            });
            console.log(response);
            

      
        }catch(error) {
            console.log(error);
            alert("Something went wrong. Try again later");
        }
        setLoading(false);
        setFormData({
            Name: "",
            Email: "",
            Password: "",
            ConfirmPassword: ""
        })
    }

    return(
        <div className="mt-16 flex flex-col justify-center items-center">
            <div className="mt-14 bg-white shadow-2xl rounded-md md:w-[450px] w-[400px] h-[750px] flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center  mb-5">
                    <div className="w-[150px] flex justify-center ">
                       <img src={Logo} className="w-[100px]"/>
                    </div>
                    <div className="-mt-2">
                        <p className="font-bold text-2xl text-center text-black ">{hasAccount? "LOGIN" : "SIGNUP"}</p>
                    </div>
                </div>

                <form onSubmit={hasAccount ? handleLogin :  handleSignup} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <label className="font-bold text-black">MATRIC NUMBER:</label>
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            className="md:w-[300px] h-[40px] border font-bold pl-4"
                            onChange={handleChange}
                        />
                    </div>

                    

                    {!hasAccount ? 
                        <div className="flex flex-col gap-3">
                            <label className="font-bold text-black">EMAIL:</label>
                            <input
                                type="email"
                                name="Email"
                                value={formData.Email}
                                className="md:w-[300px] h-[40px] border font-bold pl-4"
                                onChange={handleChange}
                            />
                        </div>
                        :
                        <p></p>
                    }

                    <div className="flex flex-col gap-3">
                        <label className="font-bold text-black">PASSWORD:</label>
                        <input
                            type="password"
                            name="Password"
                            value={formData.Password}
                            className="md:w-[300px] h-[40px] border font-bold pl-4"
                            onChange={handleChange}
                        />
                        {warning && (
                            <p className="text-red-600 font-thin">Minimum of 8 Characters</p>
                        )}
                    </div>

                    

                    {!hasAccount ? 
                        <div className="flex flex-col gap-3">
                            <label className="font-bold text-black">CONFIRM PASSWORD:</label>
                            <input
                                type="password"
                                name="ConfirmPassword"
                                value={formData.ConfirmPassword}
                                className="md:w-[300px] h-[40px] border font-bold pl-4"
                                onChange={handleChange}
                            />
                            {warning && (
                                <p className="text-red-600 font-thin">Minimum of 8 Characters</p>
                            )}
                        </div>
                        :
                        <p></p>
                    }

                    <div className="flex flex-col gap-2 items-center justify-center mt-10">
                        <p onClick={()=> setHasAccount(!hasAccount)} className="font-bold text-black hover:text-gray-700 hover:cursor-pointer">{hasAccount ? "Don't Have an Account. Sign Up" : "Already Have an Account. Sign In"}</p>
                        <button type="submit" className="text-white font-bold w-[300px] h-[30px] bg-black rounded-xs mt-6 hover:bg-gray-600 active:bg-gray-800">{hasAccount ? "LOGIN" : "SIGNUP"}</button>
                    </div>
                </form>

                {loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-sm z-50">
                        <div className="flex flex-col items-center space-y-4">
                        <BeatLoader  />
                        <p className="text-blue-950 text-sm font-bold">{hasAccount? "Logging in, Please Chill... :)": "Signing You Up, in a bit.. :)"}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
export default Profile;