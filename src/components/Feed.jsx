import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Card from "./UserCard";
import Navbar from "./Navbar";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log("Feed is", feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    // Avoid fetching if feed is already in Redux store
    if (feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("Users are",res?.data?.data)
      dispatch(addFeed(res?.data?.data)); // Ensure this is the correct data structure
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!Array.isArray(feed) || feed.length === 0) {
    return <h1 className="flex justify-center my-10">No new users found!</h1>;
  }

  return (
    <>
    {/* <Navbar/> */}
    <div className="flex justify-center my-10">
      <Card user={feed[0]} /> {/* Ensure feed[0] is correct */}
    </div>
    </>
  );
};

export default Feed;
