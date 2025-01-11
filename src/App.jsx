import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/Signup";
import {Provider} from 'react-redux';
import appStore from "./utils/appStore"
import Connections from "./components/Connections"
import Feed from "./components/Feed";
import Requests from "./components/Requests";
// import Chat from "./components/Chat";
function App() {
  return (
    <>
    <Provider store ={appStore} >
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<SignUp/>}/>
       <Route path="/feed" element={<Feed/>}/>
       <Route path="/connections" element={<Connections/>}/>
       <Route path="/requests" element={<Requests/>}/>
       <Route path="/profile" element={<Profile/>}/>
       {/* <Route path="/chat/:id" element={<Chat/>}/> */}

      </Route>

    </Routes>
    </BrowserRouter>
    </Provider>

</>
  );
}

export default App;
