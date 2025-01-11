import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from 'react-toastify';

const EditProfile = ({ user }) => {
  console.log("User is", user);
  
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(Array.isArray(user.skills) ? user.skills : user.skills.split(",").map(skill => skill.trim()));
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, skills, photoUrl, gender },
        { withCredentials: true }
      );
      console.log("Profile updated", res.data);
      dispatch(addUser(res?.data?.data));
      toast.success("Profile updated successfully!", {
        
        autoClose: 1000, 
      });
    } catch (error) {
      console.error("Error updating profile", error);
      setError(error.response.data);
      toast.error("Error updating profile: " + error.response.data);
    }
  };

  return (
    <div>
      <div className="flex relative">
        <div className="mt-2 grow justify-center items-center">
          <h1 className="text-4xl text-center">Edit Profile</h1>
          <form
            className="max-w-md mx-auto border flex flex-col gap-4 p-4 mt-3"
            onSubmit={handleSubmit}
          >
            {/* First Name Input */}
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="p-4 rounded-3xl"
              required
            />

            {/* Last Name Input */}
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="p-4 rounded-3xl"
              required
            />

            {/* Age Input */}
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="p-4 rounded-3xl"
            />
            <label>
              Photo URL:
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Photo URL"
                className="p-4 rounded-3xl"
              />
            </label>

            {/* About Input */}
            About:
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About"
              className="p-4 rounded-3xl h-24"
            />

            {/* Gender Selection Radio Buttons */}
            Gender:
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </div>

            {/* Skills Input */}
            Skills:
            <input
              type="text"
              value={skills.join(", ")}
              onChange={(e) =>
                setSkills(e.target.value.split(",").map((skill) => skill.trim()))
              }
              placeholder="Skills (comma separated)"
              className="p-4 rounded-3xl"
            />
            {error && <div className="text-red-500 text-center">{error}</div>}
  
            {/* Submit Button */}
            <button
              className="btn bg-red-400 cursor-pointer p-4 rounded-3xl text-white text-xl"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
        <div className="absolute right-48 mt-16">
          <UserCard user={{ firstName, lastName, age, about, photoUrl, skills, gender }} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
