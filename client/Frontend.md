# About Frontend of this project

- First remove unneseccary code and files that npm makes
- create different files for different pages
- define routes for each page
Run the application:

Authentication: JSON Web Tokens (JWT) for user authentication and authorization.
File Storage: Multer for handling file uploads.
Security: Helmet for setting various HTTP headers, bcrypt for password hashing, and JWT for secure authentication.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/social-media-app.git
cd social-media-app
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and add the following:

bash
Copy code
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=<your-port-number>
Run the application:

bash
Copy code
npm run dev
Access the application: Open your browser and navigate to http://localhost:<PORT>.
