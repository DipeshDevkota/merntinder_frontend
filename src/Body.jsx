import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import Feed from "./components/Feed";
const Body = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate()

    const fetchUser = async () => { // Removed 'e' as it's not required
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });

            console.log("User's detail is", res.data);
            dispatch(addUser(res.data)); // Dispatch action to update Redux store
        } catch (error) {
            if(error.status=== 401){
                navigate("/login")
            }
            console.error(error);
            // You can handle error messaging here
        }
    };

    useEffect(() => {
        fetchUser();
    }, []); // Empty dependency array to run the effect once on mount

    return (
        <div>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
};

export default Body;
