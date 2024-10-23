import { useRef, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';




const Registration = () => {


    // hooks
    const registerForm = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const navigate = useNavigate();



    // handle register
    const handleSignUp = e => {
        e.preventDefault();
        // get the data from form
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;

        // regular expression for password
        const passwordRegExPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        setPasswordErrorMessage();

        // password validation
        if (!passwordRegExPattern.test(password)) {
            setPasswordErrorMessage("Password should be minimum 6 characters, contain at least 1 capital letter & 1 special character");
            return;
        }

        // getting the user details in an object
        const newData = { name, email, phone, password }
        // stringify the object to set in local storage
        const newUserData = JSON.stringify(newData)
        localStorage.setItem("user-data", newUserData)

        // set user login true
        const userLoginStatus = true;
        localStorage.setItem("login-status", userLoginStatus)

        // showing success toast
        toast.success('Account created successfully!');
        navigate("/");
    }



    // show-hide password functionality
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };



    return (
        <div className="container mx-auto p-5 min-h-[100vh] flex flex-col justify-center items-center relative">

            <div className="space-y-14 flex flex-col justify-center items-center w-full font-heading mt-12 md:mt-5">
                <h2 className="text-4xl text-main font-bold text-center ">Sign up Kro!</h2>

                {/* sign up form */}
                <form onSubmit={handleSignUp} ref={registerForm} className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 gap-8 px-10 font-body">

                    {/* name input */}
                    <div className="w-full flex flex-col justify-center items-start gap-4">
                        <label className="font-medium">Your Name <span className='text-[red]'>*</span></label>
                        <input required type="text" name="name" placeholder="Full name" id="name" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                    </div>

                    {/* email input */}
                    <div className="w-full flex flex-col justify-center items-start gap-4">
                        <label className="font-medium">Your Email <span className='text-[red]'>*</span></label>
                        <input required type="email" name="email" placeholder="Email address" id="email" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                    </div>


                    {/* phone input */}
                    <div className="w-full">
                        <label className="font-medium">Your Phone <span className='text-[red]'>*</span></label>
                        <div className="flex relative w-full justify-center items-center mt-3">
                            <input required type="tel" name="phone" placeholder="Phone number" id="phone" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                        </div>
                    </div>


                    {/* password input */}
                    <div className="w-full">
                        <label className="font-medium">Your password <span className='text-[red]'>*</span></label>
                        <div className="flex relative w-full justify-center items-center mt-3">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-[gray]"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                        {
                            passwordErrorMessage ? <p className="text-[14px] font-semibold text-[#ce0f0f]">{passwordErrorMessage}</p> : ''
                        }
                    </div>


                    {/* submit button */}
                    <input type="submit" value="Register" className="bg-black px-4 py-2 rounded text-white font-semibold hover:bg-white hover:text-black duration-500 w-full cursor-pointer" />

                </form>


                {/* back to homepage button */}
                <Link to="/" className="text-[gray] absolute top-[-30px] md:top-0 left-5 flex justify-center items-center gap-2 text-gray font-semibold hover:text-black duration-500"><MdHome /> Back to Home</Link>
            </div>

            {/* login route toggle */}
            <div className="flex justify-center items-center flex-col font-body">
                <div className="mt-5 flex justify-center items-center gap-1">
                    <p className="text-center font-medium ">Already have an account?</p>
                    <Link to="/login" className="font-bold border-b-2 border-[gray] hover:bg-main hover:text-white hover:bg-black hover:border-black px-2 py-1 duration-300">Login</Link>
                </div>
            </div>

            <Toaster />

        </div>
    );
};

export default Registration;