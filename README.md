# Wanderlust

Wanderlust is a **full-stack Airbnb-style property listing platform** where users can explore listings, create their own listings, and manage them.

This project is being built as a **learning-focused full stack application** to practice real-world development concepts including authentication, REST APIs, database design, and frontend-backend integration.

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS / Tailwind (optional)
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Tools

* Git & GitHub
* Postman
* VS Code

---

## Project Structure

```
wanderlust
│
├── client        # React frontend
├── server        # Express backend
│
├── README.md
└── .gitignore
```

---

## Features (MVP)

### Authentication

* User registration
* User login
* JWT based authentication

### Listings

* View all listings
* View listing details
* Create new listing
* Edit listing
* Delete listing
* Only listing owner can modify their listings

### Other

* RESTful API architecture
* Clean backend structure (controllers, services, models)
* Error handling middleware

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/garvitsingh171/wanderlust.git
```

### 2. Navigate to project

```bash
cd wanderlust
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal.

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file inside the **client** folder.

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Development Roadmap

This project is being built in milestones:

1. Backend API development
2. Authentication system
3. Listings CRUD
4. Frontend UI integration
5. Image uploads
6. Booking system
7. Reviews and ratings
8. Deployment

---

## Learning Goals

This project focuses on learning:

* Backend architecture
* REST API design
* Authentication & authorization
* React frontend architecture
* Full stack integration
* Real-world project structure

---

## Author

Garvit Singh

GitHub: https://github.com/garvitsingh171
LinkedIn: https://linkedin.com/in/garvitsingh171
