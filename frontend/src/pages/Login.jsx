import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup ,googleLogin} from '../serviecs/authService';
import { Mail, Lock, User ,ShieldCheck, Upload, Cloud, FolderOpen } from "lucide-react";
import { GoogleLogin}  from "@react-oauth/google";
import sud from '../assests/sud.png';
import honey from '../assests/honey.png'

function Login(){
    const navigate = useNavigate();
    const [isLogin ,setIsLogin]=useState(true);
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (isLogin) {
            const data = await login({
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", data.token);
            navigate("/dashboard");

        } else {
            await signup(formData);
           // alert("Account created successfully!");
            setIsLogin(true);
            setFormData({
                name: "",
                email: "",
                password: "",
            });
        }
    } catch (error) {

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Something went wrong");
        }

    }
};
    return (
       <div className="min-h-screen flex">
       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200">
            <img
            src={honey}
            alt="BeeHive Background"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
           /> 
           <div className="relative z-10 flex flex-col  items-start h-full p-16 w-full">
             <div className="flex items-center gap-3 mb-10 h-14 w-15">
                    <img src={sud}alt="BeeHive logo"  />
                    <h1 className="text-5xl font-bold ">BeeHive</h1>
            </div>

            {/* Heading will come here */}
             <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Store,
                <br />
                Organize &
                <br />
                Access Your Files
                </h2>

            {/* Features will come here */}
                <div className="mt-10 space-y-5">

        <div className="flex items-center gap-4">
            <div className="bg-yellow-300 p-2 rounded-full">
            <Upload size={18} className="text-gray-900 " />
            </div>
            <span className="text-xl text-gray-700">
            Upload files securely in seconds
            </span>
        </div>

        <div className="flex items-center gap-4">
            <div className="bg-yellow-300 p-2 rounded-full">
            <FolderOpen size={18} className="text-gray-900" />
            </div>
            <span className="text-xl text-gray-700">
            Organize documents with ease
            </span>
        </div>

        <div className="flex items-center gap-4">
            <div className="bg-yellow-300 p-2 rounded-full">
            <Cloud size={18} className="text-gray-900" />
            </div>
            <span className="text-xl text-gray-700">
            Access your files from anywhere
            </span>
        </div>

        <div className="flex items-center gap-4">
            <div className="bg-yellow-300 p-2 rounded-full">
            <ShieldCheck size={18} className="text-gray-900" />
            </div>
            <span className="text-xl text-gray-700">
            Protected with secure authentication
            </span>
        </div>

        </div>
    </div>
        </div>
                  
        <div className=" w-full lg:w-1/2 bg-gray-100 flex items-center justify-center ">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl  p-8">
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                <button onClick={() => setIsLogin(true)}  
                className={`w-1/2 py-3 rounded-lg font-semibold transition ${isLogin
                        ? "bg-yellow-400 text-black shadow"
                        : "text-gray-500"
                    }`}> Login
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`w-1/2 py-3 rounded-lg font-semibold transition ${
                    !isLogin
                        ? "bg-yellow-400 text-black shadow"
                        : "text-gray-500"
                    }`}
                > 
                    Sign Up
                </button>
              </div>
              <div className='mt-3' >
                    <h1 className="text-3xl font-bold text-center mb-2">
                    {isLogin ? "Welcome Back!" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 text-center mb-8">
                    {isLogin
                        ? "Login to continue to Beehive."
                        : "Create your Beehive account."}
                    </p>
                    </div>
                <form onSubmit={handleSubmit} className="space-y-3">

  {/* Name - Only for Signup */}
  {!isLogin && (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2"> Full Name</label>
        <div className="relative">
           <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
        </div>
        </div>
  )}
  {/* Email */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2"> Email Address</label>
         <div className="relative">
            <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
         />
    </div>
   </div>
  {/* Password */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
      <div className="relative">
        <Lock
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
            <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
         />
            
    </div>
</div>
            <div className="flex items-center mt-3 justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                type="checkbox"className="w-4 h-4 accent-yellow-400"/>
                <span className="text-sm text-gray-600">
                Remember me
                </span>
            </label>
            {isLogin && (
                <button
                type="button"
                className="text-sm text-yellow-600 hover:underline" >Forgot Password?
                </button>
            )}

            </div>

        <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl transition duration-300">
            {isLogin ? "Login" : "Create Account"}
        </button>
        {/* Bottom Toggle */}
        <p className="text-center text-gray-600 text-sm">
            {isLogin ? (
            <>
                Don't have an account?{" "}
                <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-yellow-600 font-semibold hover:underline"
                >
                Sign Up
                </button>
            </>
            ) : (
            <>
                Already have an account?{" "}
                <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-yellow-600 font-semibold hover:underline"
                >
                Login
                </button>
            </>
            )}
        </p>
            <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>

            <span className="px-4 text-sm text-gray-500">
                OR
            </span>

            <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="w-full flex justify-center">
            <GoogleLogin
             onSuccess={async (credentialResponse) => {
              try {
                 const data = await googleLogin(
                credentialResponse.credential  );
                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    alert("Google Login Successful");
                    navigate("/dashboard");

                } catch (error) {
                    console.log(error);
                }
                }}
                onError={() => {
                    console.log("Google Login Failed");
                }}
/>
        </div>
        </form>    
        </div>
        </div>
        </div>
    );
}

export default Login;