import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import {removeUser} from "../utils/userSlice"

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handlelogOut = async () => {
    try {
     await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true, // This should be in the axios config
        }
      );
      localStorage.removeItem("token");
      dispatch(removeUser());
      // disconnectSocket()

      navigate("/login")

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  console.log(user);

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && user.firstName && (
        <div className="flex-none gap-2">
          <p className="">Welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end mx-6 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photoUrl || "default-avatar.png"} // Fallback if photoUrl is missing
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
              <Link to='/connections' className="justify-between">
                <div>Connections</div>
              </Link>
              </li>
              <li>
              <Link to='/requests' className="justify-between">
                <div>Requests</div>
              </Link>
              </li>
              <li>
                <a onClick={handlelogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
