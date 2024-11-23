# Catalog Dashboard

The frontend for the **Catalog Dashboard** application is a **React-based** UI that interacts with the backend API to manage catalogs. It allows users to view, add, update, and delete catalogs dynamically. The application is styled using **Bootstrap** for a clean and responsive user interface.

link to backend repository:
https://github.com/ofirbenesh/backend.git

---

## Features
- Interactive catalog management UI.
- Search functionality for filtering catalogs.
- Dynamic updates to reflect changes made to the catalogs.
- Responsive design with Bootstrap.

<img width="957" alt="image" src="https://github.com/user-attachments/assets/da29b44b-fd5b-4637-9cf3-1b881b1b566d">


---

## Technologies Used
- **React**: Framework for building the user interface.
- **TypeScript**: Strict typing for safer and cleaner code.
- **Bootstrap**: CSS framework for styling.

---

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v18 or later)
- **npm** (v8 or later)
- MongoDB

---

## Installation and Setup
To clone and run this application, you'll need [Git](https://git-scm.com) installed on your computer.
  
From your command line:
  
```bash
# Clone this repository.
$ git clone https://github.com/ofirbenesh/catalog-dashboard.git

# For running the backend - go to repository
$ gh repo clone ofirbenesh/backend

# Install dependencies:
$ npm install
$ npm install mongoose
$ npm install --save-dev @types/mongoose

# make sure you are connected to MongoDB
"connectionString": "mongodb://localhost:27017/"

# Optional: if you want to preload Mock data into the DB to see how the table looks like with catalogs
# run the script:
$ cd backend/src/scripts
$ npm run load-data

# start the server.
$ cd backend
$ npm start

# For running the Client - go back to this repository
$ cd catalog-dashboard
$ npm start
```
The frontend will run on http://localhost:3001.

## How to run and use the app - video


https://github.com/user-attachments/assets/3343e332-0415-4bd1-a222-fb07ef4b9da8



