## ChatSphere
A Web Application(Back-end) for realtime chatting.

### Problem Statement :
 Develop a comprehensive backend for a real-time chat application using the MERN
 stack, emphasizing the use of Node.js and MongoDB for server-side logic and
 database management. This assignment is designed to test your ability to manage
 real-time data exchange, database schema design, user authentication, and
 server-side logic, including integration with third-party APIs for language processing.

### Setup

// Installing dependencies in root directory
- npm i 

// Now, going inside frontend directory and again installing dependencies and build app
- cd frontend && npm i
- npm run build 
- cd ..   
- npm start

### POSTMAN API Documentation
- Collection of APIs used for authentication

https://documenter.getpostman.com/view/21201660/2sA3JNa11Y
- Collection of APIs used for sending and receiving messages
  
https://documenter.getpostman.com/view/21201660/2sA3JNa11a
- Collection of APIs used for getting users list to create chats

https://documenter.getpostman.com/view/21201660/2sA3JNa15q

### Render Deployment Link -
 https://chatsphere-oq7g.onrender.com


## Environment Variables
Enter your credentials for the following-
- PORT=
- MONGO_DB_URI=
- JWT_SECRET=
- MODE=
- API_KEY=

### Features Included 
- User Authentication
- Token Generation using JWT
- Real-time chatting using Socket.IO
- Saved users and messages in MongoDB
- Used bcrypt to hash passwords saved in database
- Integrated LLM - Gemini API
- Users can set their status as 'Available' or 'Busy'
- Automated response from LLM if user is busy
- Standard message, in case LLM doesn't respond- 'User is busy'.

### Technologies Used
ChatSphere is built using the MERN (MongoDB, Express.js, React, Node.js), socket io, JWT, Gemini AI. The frontend is a basic one which is for demonstation purpose of backend functions.

### Feedback and Contributions
We welcome feedback and contributions from the community. If you find a bug or have a feature request, please open an issue. We encourage you to fork the repository, make improvements, and create a pull request.

### By-
#### Sumit 
#### Lovely Professional Univeresity 
#### Reg. No. 12115166
