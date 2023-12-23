# NotaNexus - Project Documentation

## Backend

The NotaNexus backend is organized in a modularized structure, with the main file being `index.js`. Below is an overview of the structure and configuration.

### Folder Structure

- **`routes`:** Contains the application's routes.
- **`handlers`:** Handlers for each route, execute controllers, and manage responses.
- **`controllers`:** Controllers that implement the application logic.
- **`models`:** Defines the database models.

### Database Configuration

The models are related as follows: `User.hasMany(Note)` and `Note.belongsTo(User)`. Each user can have many notes, but each note belongs to a single user.

To start the backend, PostgreSQL is required. Create a `.env` file in the root of the backend with the following variables:

```env
PORT=3001
DB_DEPLOY=  # URL of your deployed database
JWT_SECRET=  # Secret for JSON Web Token generation
Start the Backend
In the root folder of the backend, run the following commands:

bash
Copy code
npm i
npm start
This will start the backend using technologies like Node.js, Express, Sequelize, PostgreSQL, JSON Web Token, Bcrypt.js, among others.

Frontend
The NotaNexus frontend is built with React and Vite, using JavaScript. Below is information about configuration and execution.

Environment Configuration
In the root of the frontend, create a .env file with the following variable:

env
Copy code
VITE_BACKEND_URL=  # URL of your backend (e.g., http://localhost:3001)
Start the Frontend
In the root folder of the frontend, run the following commands:

bash
Copy code
npm i
npm run start
This will start the frontend using React, Vite, Redux for global state, and React Router DOM for route management.

Create an Account and Get Started
After starting the application, go to http://localhost:5173/. Create an account, log in, and begin creating your notes.

Ready to start your NotaNexus experience!