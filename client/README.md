# Wanderlust – Client (Frontend)

This folder contains the **frontend application** for the Wanderlust project, an Airbnb-style property listing platform.

The client is built using **React + Vite** and communicates with the backend API to display and manage listings, authentication, and user interactions.

---

## Tech Stack

* React
* Vite
* JavaScript
* CSS / Tailwind (if added later)
* Axios / Fetch for API calls
* React Router for navigation

---

## Features (MVP)

* User Authentication (Login / Register)
* View all listings
* View listing details
* Create a new listing
* Edit existing listing
* Responsive UI

More features like bookings, reviews, and advanced search will be added later.

---

## Folder Structure

```
client
│
├── src
│   ├── components        # Reusable UI components
│   ├── pages             # Page level components
│   ├── services          # API request functions
│   ├── hooks             # Custom React hooks
│   ├── context           # Global state (auth, user)
│   ├── assets            # Images, icons, logos
│   ├── utils             # Helper functions
│   ├── App.jsx
│   └── main.jsx
│
├── public
└── package.json
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

The app will start at:

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the client folder.

Example:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

This URL should point to the backend server.

---

## API Communication

The frontend communicates with the backend REST API for:

* Authentication
* Listings CRUD operations
* User actions

API request logic is organized inside the **services** folder.

---

## Development Approach

The frontend is being developed using a **milestone-based approach**:

1. Project setup and routing
2. Authentication UI
3. Listings feed
4. Listing detail page
5. Create / edit listings
6. UI improvements

Focus is on **functionality first, polish later**.

---

## Project

Wanderlust is a simplified clone of **Airbnb** built to learn **full-stack development**.

Backend: Node.js, Express, MongoDB
Frontend: React + Vite
