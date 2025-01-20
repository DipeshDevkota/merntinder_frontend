# MERN Frontend Project

This project is a frontend application built using React.js, Redux Toolkit, and Tailwind CSS. It is part of a MERN stack application that allows users to interact with each other in real-time. Below is a detailed description of the features and functionalities of this project.
## Usage

1. Log in to the application.
2. Navigate to the feed to see all logged-in users.
3. Send interest or ignore users as desired.
4. Manage connection requests by accepting or rejecting them.
5. Communicate in real-time with connected users on accepting the connection request. TensorFlow.js is used to filter inappropriate messages to ensure safe communication.

## Features

- **User Authentication**: Users can log in to the application.
![Login](https://github.com/DipeshDevkota/merntinder_frontend/blob/main/Screenshot%20from%202025-01-20%2018-43-16.png)
- **Update Profile**: Logged-in users can update thier profile  that will be rendered as similar to other users in feed
![UpdateProfile](https://github.com/DipeshDevkota/merntinder_frontend/blob/main/Screenshot%20from%202025-01-20%2018-44-31.png)
- **Feed Navigation**: Logged-in users can navigate to the feed to see all other logged-in users.
![Feed](https://github.com/DipeshDevkota/merntinder_frontend/blob/main/Screenshot%20from%202025-01-20%2018-45-16.png)

- **Interest and Ignore**: Users can send interest or ignore other users.
    - **Send Interest**: When User A sends interest to User B, User B will see the request in their connection requests.
    - **Ignore**: If User A clicks the ignore button, User B will be removed from the feed.
    ![Connection Request](https://github.com/DipeshDevkota/merntinder_frontend/blob/main/Screenshot%20from%202025-01-20%2018-46-09.png)

- **Connection Requests**: Users can accept or reject connection requests.
    - **Accept Request**: On accepting a request, users can communicate in real-time using web sockets (Socket.io).
    - **Reject Request**: If User B rejects the request, it will be removed from the requests and the feed.


- **Real-time Communication**: Users can communicate in real-time with the help of web sockets (Socket.io).
    ![Connection Request](https://github.com/DipeshDevkota/merntinder_frontend/blob/main/Screenshot%20from%202025-01-20%2018-47-16.png)

      ![Chat](https://github.com/DipeshDevkota/merntinder_frontend/blob/main/Screenshot%20from%202025-01-20%2018-48-50.png)


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





