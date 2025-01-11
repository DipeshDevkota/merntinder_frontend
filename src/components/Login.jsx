import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault(); 
        setErrorMessage(""); 
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password,
            }, {
                withCredentials: true // Allow cookies to be sent with the request
            });

           localStorage.setItem("token",res.data.token)
                       
            // Dispatch user data to Redux store
            dispatch(addUser(res.data.user)); // Update Redux store with user data
            

            navigate("/feed");
        } catch (error) {
            console.error(error);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    return (
        <div className="mt-52 grow justify-center items-center">
            <h1 className="text-4xl text-center">LogIn</h1>
            <form
                className="max-w-md mx-auto border flex flex-col gap-2 p-2 mt-3"
                onSubmit={handlelogin}
            >
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
                    placeholder="password"
                    className="p-4 rounded-3xl"
                    required
                />
                <button
                    className="btn bg-red-400 cursor-pointer p-4 rounded-3xl text-white text-xl"
                    type="submit"
                >
                    LogIn
                </button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet?
                    <Link className='underline text-black' to={'/register'}>Register now</Link>
                </div>
                {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Login;
