import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevents page reload on submit
        try {
             await axios.post(
                BASE_URL+"/signup",
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                },
                {},
                {
                    withCredentials: true, // Allows cookies or other credentials to be sent
                }
            );
            // console.log(res.data); 
            navigate("/login")
            // Handle response here, like redirecting or showing a success message
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div className="mt-52 grow justify-center items-center">
            <h1 className="text-4xl text-center">Sign Up</h1>
            <form
                className="max-w-md mx-auto border flex flex-col gap-2 p-2 mt-3"
                onSubmit={handleSignUp}
            >
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="p-4 rounded-3xl"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="p-4 rounded-3xl"
                    required
                />
                <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="your@gmail.com"
                    className="p-4 rounded-3xl"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="p-4 rounded-3xl"
                    required
                />
                <button
                    className="btn bg-green-400 cursor-pointer p-4 rounded-3xl text-white text-xl"
                    type="submit"
                >
                    Sign Up
                </button>
                <div className="text-center py-2 text-gray-500">
                    Already have an account? {/* Add login link here */}
                    <Link className='underline text-black' to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
