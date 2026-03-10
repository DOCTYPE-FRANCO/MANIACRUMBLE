import React, {useState} from "react";
import { useAuth } from "./AuthContext";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Package, Heart, LogOut } from "lucide-react";
import Logo from "./assets/LOGO.png"
import { buttonStyles } from "./theme";

function Profile(){
    const { user, signUp, signIn, signOut, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    });
    const [hasAccount, setHasAccount] = useState(true);
    const [warning, setWarning] = useState(false);
    
    if (user && !authLoading) {
        return (
            <div className="min-h-screen bg-black flex">
                {/* Left side - Dashboard */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-24">
                    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12">
                        {/* Logo for mobile */}
                        <div className="flex justify-center mb-8 lg:hidden">
                            <img src={Logo} className="w-24 h-24" alt="Logo"/>
                        </div>

                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-300 text-lg">
                            {user.user_metadata?.name || user.email}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
                            <Package className="mx-auto mb-2 text-white" size={32} />
                            <p className="text-2xl font-bold text-white">0</p>
                            <p className="text-gray-300 text-sm">Orders</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
                            <Heart className="mx-auto mb-2 text-white" size={32} />
                            <p className="text-2xl font-bold text-white">0</p>
                            <p className="text-gray-300 text-sm">Wishlist</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <button 
                            onClick={() => window.location.href = '/orders'}
                            className="bg-white text-black font-bold py-3 px-6 hover:bg-gray-200 transition-colors"
                        >
                            Order History
                        </button>
                        <button 
                            onClick={() => window.location.href = '/wishlist'}
                            className="bg-white/10 backdrop-blur-sm text-white font-bold py-3 px-6 border border-white/20 hover:bg-white/20 transition-colors"
                        >
                            My Wishlist
                        </button>
                    </div>
                    
                    <button 
                        onClick={signOut}
                        className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 border border-white/30 hover:bg-white/10 transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Right side - Logo with animation (Desktop only) */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                <img src={Logo} className="w-full max-w-md animate-float" alt="Logo"/>
            </div>
        </div>
        );
    }

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
        
        if(formData.Password !== formData.ConfirmPassword){
            toast.error("Passwords don't match");
            setLoading(false);
            return;
        }

        if(formData.Password.length < 8){
            setWarning(true);
            setLoading(false);
            return;
        }
        
        try{
            await signUp(formData.Email, formData.Password, formData.Name);
            toast.success("Account created successfully!");
            setFormData({ Name: "", Email: "", Password: "", ConfirmPassword: "" });
        } catch(error) {
            toast.error(error.message || "Something went wrong");
        }
        
        setLoading(false);
        setWarning(false);
    }

    async function handleLogin(e){
        e.preventDefault();
        setLoading(true);
        
        try{
            await signIn(formData.Email, formData.Password);
            toast.success("Welcome back!");
        } catch(error) {
            toast.error(error.message || "Invalid credentials");
        }
        
        setLoading(false);
    }

    return(
        <div className="min-h-screen bg-black flex">
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-24">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8">
                    {/* Logo for mobile */}
                    <div className="flex justify-center mb-6 lg:hidden">
                        <img src={Logo} className="w-20 h-20" alt="Logo"/>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {hasAccount ? "Sign In" : "Create Account"}
                        </h1>
                        <p className="text-gray-300">
                            {hasAccount ? "Welcome back to ManiaCrumble" : "Join ManiaCrumble today"}
                        </p>
                    </div>

                <form onSubmit={hasAccount ? handleLogin : handleSignup} className="space-y-5">
                    {!hasAccount && (
                        <div>
                            <label className="block text-white font-bold mb-2 flex items-center gap-2">
                                <UserIcon size={18} />
                                NAME
                            </label>
                            <input
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                                required={!hasAccount}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-white font-bold mb-2 flex items-center gap-2">
                            <Mail size={18} />
                            EMAIL
                        </label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white font-bold mb-2 flex items-center gap-2">
                            <Lock size={18} />
                            PASSWORD
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {warning && (
                            <p className="text-red-400 text-sm mt-2">
                                Password must be at least 8 characters
                            </p>
                        )}
                    </div>

                    {!hasAccount && (
                        <div>
                            <label className="block text-white font-bold mb-2 flex items-center gap-2">
                                <Lock size={18} />
                                CONFIRM PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="ConfirmPassword"
                                    value={formData.ConfirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                                    required={!hasAccount}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-3 px-6 hover:bg-gray-200 transition-colors"
                    >
                        {loading ? (
                            <BeatLoader size={8} color="#000000" />
                        ) : (
                            hasAccount ? "SIGN IN" : "CREATE ACCOUNT"
                        )}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setHasAccount(!hasAccount);
                                setWarning(false);
                                setFormData({ Name: "", Email: "", Password: "", ConfirmPassword: "" });
                            }}
                            className="text-white hover:text-gray-300 font-bold"
                        >
                            {hasAccount 
                                ? "Don't have an account? Sign Up" 
                                : "Already have an account? Sign In"}
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center">
                            <BeatLoader color="#ffffff" size={15} />
                            <p className="text-white font-bold mt-4">
                                {hasAccount ? "Signing you in..." : "Creating your account..."}
                            </p>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {/* Right side - Logo with animation (Desktop only) */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                <img src={Logo} className="w-full max-w-md animate-float" alt="Logo"/>
            </div>
        </div>
    );
}
export default Profile;
