# MERN Frontend Project

This project is a frontend application built using React.js, Redux Toolkit, and Tailwind CSS. It is part of a MERN stack application that allows users to interact with each other in real-time. Below is a detailed description of the features and functionalities of this project.

## Features

- **User Authentication**: Users can log in to the application.
- **Feed Navigation**: Logged-in users can navigate to the feed to see all other logged-in users.
- **Interest and Ignore**: Users can send interest or ignore other users.
    - **Send Interest**: When User A sends interest to User B, User B will see the request in their connection requests.
    - **Ignore**: If User A clicks the ignore button, User B will be removed from the feed.
- **Connection Requests**: Users can accept or reject connection requests.
    - **Accept Request**: On accepting a request, users can communicate in real-time using web sockets (Socket.io).
    - **Reject Request**: If User B rejects the request, it will be removed from the requests and the feed.
- **Real-time Communication**: Users can communicate in real-time with the help of web sockets (Socket.io).
- **Message Filtering**: TensorFlow.js is used to filter inappropriate messages to ensure safe communication.

## Tech Stack

- **Frontend**:
    - React.js
    - Redux Toolkit
    - Tailwind CSS
- **Real-time Communication**:
    - Socket.io
- **Message Filtering**:
    - TensorFlow.js

## Folder Structure

- **utils**: Contains utility functions and configurations for Redux Toolkit and other functionalities.

## Installation

1. Clone the repository:
     ```bash
     git clone https://github.com/yourusername/mern-frontend.git
     ```
2. Navigate to the project directory:
     ```bash
     cd mern-frontend
     ```
3. Install dependencies:
     ```bash
     npm install
     ```
4. Start the development server:
     ```bash
     npm start
     ```

## Usage

1. Log in to the application.
2. Navigate to the feed to see all logged-in users.
3. Send interest or ignore users as desired.
4. Manage connection requests by accepting or rejecting them.
5. Communicate in real-time with connected users.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.


