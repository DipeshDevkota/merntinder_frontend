import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { FaUser, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnection(res?.data?.data)); 
    } catch (error) {
      console.error("Error in server while fetching the connections", error.message);
    }
  };

  useEffect(() => {
    allConnection();
  }, []);

  if (!Array.isArray(connections) || connections.length === 0) {
    return <h1 className="text-center text-2xl text-gray-700">No Connections Found</h1>;
  }

  const handleChatClick = (connectionId) => {
    console.log("connection id is",connectionId)
    navigate(`/chat/${connectionId}`);
  };



  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="font-bold text-slate-400 text-4xl mb-8">Connections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image section */}
            <div className="relative">
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName} ${connection.lastName}`}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">
                <FaUser className="text-white text-6xl opacity-50" />
              </div>
            </div>
            {/* User information */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-gray-600 text-center my-2">{connection.about}</p>
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-500">Age: </span>
                  <span className="text-sm text-gray-800">{connection.age}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-500">Gender: </span>
                  <span className="text-sm text-gray-800">{connection.gender}</span>
                </div>
              </div>
              {/* Skills section */}
              {connection.skills && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {connection.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-600 text-sm font-medium py-1 px-3 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {/* Chat button */}
              <button
                onClick={() => handleChatClick(connection._id)}
 
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Chat
              </button>
            </div>
            {/* Rating or Stars */}
            <div className="bg-gray-100 py-3 text-center">
              <FaStar className="text-yellow-500 inline" />
              <FaStar className="text-yellow-500 inline" />
              <FaStar className="text-yellow-500 inline" />
              <FaStar className="text-yellow-500 inline" />
              <FaStar className="text-yellow-500 inline" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
