import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
    const [newMessage, setNewMessage] = useState(''); // Single message state for the input
    const [messages, setMessages] = useState([]); // Array to store messages
    const { id } = useParams();
    const user = useSelector(store => store.user);
    const userId = user._id;

    useEffect(() => {
        const socket = createSocketConnection();

        // As soon as the page gets loaded, the socket connection is made and joinChat event is emitted
        socket.emit("joinChat", 
          { id,
           firstName: user.firstName, 
           userId,
           });

        // Listen for incoming messages
        socket.on("messageReceived", ({ firstName, text }) => {
            console.log(firstName + " received: " + text);
            setMessages(prevMessages => [...prevMessages, { firstName, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [id, userId, user.firstName]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const socket = createSocketConnection();
            socket.emit("sendMessage", {
                id,
                firstName: user.firstName,
                text: newMessage,
                userId,
            });

            // Optionally, update your local message list immediately to show the sent message
            setMessages(prevMessages => [...prevMessages, { firstName: user.firstName, text: newMessage }]);
            setNewMessage(''); // Clear the input field after sending
        }
    };

    console.log(sendMessage)

    return (
        <div className='w-full md:w-full lg:w-1/2 mx-1 border border-gray-300 rounded-lg shadow-lg m-2 h-[90vh] flex flex-col bg-white'>
            <h1 className='p-5 text-xl font-semibold text-gray-800 border-b border-gray-300'>Chat</h1>
            <div className='flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 rounded-lg'>
                {/* Display messages */}
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.firstName}: </strong>{msg.text}
                    </div>
                ))}
            </div>
            <div className='p-4 border-t border-gray-300 flex items-center gap-3'>
                <input 
                    value={newMessage} // Bind the input to newMessage state
                    onChange={(e) => setNewMessage(e.target.value)} // Update state on input change
                    className='flex-1 bg-gray-100 text-gray-800 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200'
                    placeholder="Type your message..."
                />
                <button 
                    onClick={sendMessage} 
                    className='bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none transition-all duration-200'>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
