
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const Card = ({ user }) => {
  const feed = useSelector((store) => store.feed);


const dispatch= useDispatch();

  const removeHandler= async(status,_id)=>{
    console.log("okfeed")

    try {
      
   const res= await axios.post(BASE_URL+'/request/send/'+status+'/'+_id,{},{withCredentials:true})
   console.log(res);
   dispatch(removeFeed(_id))
    } catch (error) {
      console.error(error)
      
    }
  }

    console.log("USER is", user);
    const {firstName,lastName,age,gender,photoUrl,about,skills,_id}= user;
    console.log("User firstName is", user.firstName);
  
    return (
      user && (
        <div className="card card-compact bg-base-100 w-96 shadow-xl flex ">
          <figure>
            <img
              src={photoUrl || "default-image.jpg"} 
            />
          </figure>
          <div className="card-body mt-10">
            <h2 className="card-title text-red-400">{firstName+" "+lastName }</h2>
            {age && gender && <p>{age +","+ gender}</p>}
            <p>{about}</p>
            <p>{skills}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary" onClick={()=>removeHandler("ignored",_id)}>Ignore</button>
              <button className="btn btn-primary" onClick={()=>removeHandler("interested",_id)}>Interest</button>
              
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default Card;
  