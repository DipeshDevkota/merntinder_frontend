import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const [newMessage, setNewMessage] = useState(''); // Single message state for the input
    const [messages, setMessages] = useState([]); // Array to store messages
    const { id } = useParams();
    const user = useSelector(store => store.user);
    const userId = user._id;
    const socketRef = useRef(null); // Ref to persist the socket connection

    useEffect(() => {
        // Create socket connection once
        const socket = createSocketConnection();
        socketRef.current = socket;

        // Join the chat room
        socket.emit("joinChat", {
            id,
            firstName: user.firstName,
            userId,
        });

        // Listen for incoming messages
        socket.on("messageReceived", ({ firstName, text }) => {
            console.log(firstName + " received: " + text);
            setMessages(prevMessages => [...prevMessages, { firstName, text }]);
        });

        // Cleanup socket connection on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [id, userId, user.firstName]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            // Emit the message via the existing socket connection
            socketRef.current.emit("sendMessage", {
                id,
                firstName: user.firstName,
                text: newMessage,
                userId,
            });

            // Clear the input field after sending
            setNewMessage('');
        }
    };


    useEffect(()=>{
        const fetchMesssage= async()=>{
            const data= await axios.get(BASE_URL+'/chatmessage/'+id,{withCredentials:true});
            console.log("Data is:",data)
          }

          fetchMesssage();
    },[])



    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            "chat " +
                            (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                        }
                    >
                        <div className="chat-header">
                            {`${msg.firstName}`}
                            <time className="text-xs opacity-50"> 2 hours ago</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                ))}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-500 text-gray-500 rounded p-2"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="btn btn-secondary">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
