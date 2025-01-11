import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequests, removerequests } from "../utils/requests";
import { FaUser, FaStar } from "react-icons/fa";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const requestfeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      console.log("USERS DETAIL IS", res?.data?.data);
      dispatch(addrequests(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };


  const acceptHandler= async(status,_id)=>{
    try {
      const res= await axios.post(BASE_URL+'/request/review/'+ status+'/'+_id,{},{withCredentials:true});
      console.log("Response is",res);
      dispatch(removerequests(_id))
    } catch (error) {

      console.error(error);

      
    }
  }
  useEffect(() => {
    requestfeed();
  }, []); // Ensure that useEffect runs only once on component mount

  if (!Array.isArray(requests) || requests.length === 0) {
    return <h1 className="text-center text-2xl text-gray-700 my-5">No Requests Found</h1>;
  }

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="font-bold text-slate-400 text-4xl mb-8">Connection Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {requests.map((request) => {
          const { firstName, lastName, age, gender, photoUrl, skills, about } = request.fromUserId; // Correct placement of destructuring

          return (
            <div
              key={request._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image section */}
              <div className="relative">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">
                  <FaUser className="text-white text-6xl opacity-50" />
                </div>
              </div>
              {/* User information */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-center text-gray-800">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-600 text-center my-2">{about}</p>
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <div className="text-center">
                    <span className="text-sm font-semibold text-gray-500">Age: </span>
                    <span className="text-sm text-gray-800">{age}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-gray-500">Gender: </span>
                    <span className="text-sm text-gray-800">{gender}</span>
                  </div>
                </div>
                {/* Skills section */}
                {skills && (
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-600 text-sm font-medium py-1 px-3 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Rating or Stars */}
              <div className="bg-gray-100 py-3 text-center">
                <FaStar className="text-yellow-500 inline" />
                <FaStar className="text-yellow-500 inline" />
                <FaStar className="text-yellow-500 inline" />
                <FaStar className="text-yellow-500 inline" />
                <FaStar className="text-yellow-500 inline" />
              </div>

              {/* {Button for Accepting & Rejecting} */}
              <div className="buttons flex justify-center gap-4 p-2 items-center ">
              <button onClick={()=>acceptHandler("accepted",request._id)} className="accept-button btn p-2  bg-red-300 text-white">Accept
                 
              </button>
              <button className="ignore-button btn bg-red-500 text-white"
              onClick={()=>acceptHandler("rejected",request._id)}>Reject

                </button>
              </div>
            </div>
          
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
