import React from 'react'

const Chat = () => {
  return (
    <div className='w-full md:w-fulllg:w-1/2 mx-1 border border-gray-300 rounded-lg shadow-lg m-2 h-[90vh] flex flex-col bg-white'>
      <h1 className='p-5 text-xl font-semibold text-gray-800 border-b border-gray-300'>Chat</h1>
      <div className='flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 rounded-lg'>
        {/* Messages will go here */}
      </div>
      <div className='p-4 border-t border-gray-300 flex items-center gap-3'>
        <input 
          className='flex-1 bg-gray-100 text-gray-800 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200'
          placeholder="Type your message..."
        />
        <button className='bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none transition-all duration-200'>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
