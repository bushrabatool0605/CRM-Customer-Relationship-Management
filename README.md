# XDevFlow CRM — Internship Assessment

A full-stack Customer Relationship Management (CRM) application built with the MERN stack.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, React Router, Axios     |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB Atlas                     |
| Auth       | JWT (JSON Web Tokens), bcryptjs   |
| Styling    | Plain CSS (custom)                |

---

##  Features

-  User Registration & Login with JWT Authentication
-  Protected Routes (unauthenticated users redirected to login)
-  Dashboard with live lead statistics by status
-  Full Lead Management:
  - Create Lead
  - View Lead Details
  - Edit Lead
  - Delete Lead
-  Search Leads by name, email or company
-  Filter Leads by status
-  Responsive UI

---

##  Folder Structure

```text
xdevflow-crm-assessment/
├── client/                       # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx        # Sidebar layout wrapper
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state
│   │   ├── hooks/
│   │   │   └── useAuth.js        # Auth context hook
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LeadsPage.jsx
│   │   │   ├── CreateLeadPage.jsx
│   │   │   ├── EditLeadPage.jsx
│   │   │   └── ViewLeadPage.jsx
│   │   ├── utils/
│   │   │   └── axios.js          # Axios instance with token interceptor
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── server/                       # Express backend
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, GetMe
│   │   └── leadController.js     # CRUD + Search + Filter
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protect middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Lead.js               # Lead schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth/*
│   │   └── leadRoutes.js         # /api/leads/*
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/bushrabatool0605/CRM-Customer-Relationship-Management.git
cd xdevflow-crm-assessment
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create `server/.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri_here
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

You should see:
Server running on port 5000

MongoDB Connected: your-cluster.mongodb.net
---

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
```

Create `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:

```bash
npm run dev
```

App runs at: `http://localhost:5173`

---

## Lead Fields

| Field       | Type   | Required | Notes                                         |
|-------------|--------|----------|-----------------------------------------------|
| Full Name   | String | yes      |                                               |
| Email       | String | yes      |                                               |
| Phone       | String | yes      |                                               |
| Company     | String | yes      |                                               |
| Status      | Enum   | yes      | New, Contacted, Qualified, Won, Lost          |

---

## 🔗 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint         | Access  | Description        |
|--------|------------------|---------|--------------------|
| POST   | /register        | Public  | Register new user  |
| POST   | /login           | Public  | Login user         |
| GET    | /me              | Private | Get logged in user |

### Lead Routes — `/api/leads`

| Method | Endpoint         | Access  | Description              |
|--------|------------------|---------|--------------------------|
| GET    | /                | Private | Get all leads            |
| GET    | /?search=query   | Private | Search leads             |
| GET    | /?status=New     | Private | Filter leads by status   |
| GET    | /:id             | Private | Get single lead          |
| POST   | /                | Private | Create new lead          |
| PUT    | /:id             | Private | Update lead              |
| DELETE | /:id             | Private | Delete lead              |

---

##  Environment Variables

### `server/.env`

| Variable     | Description                  |
|--------------|------------------------------|
| PORT         | Server port (default: 5000)  |
| MONGO_URI    | MongoDB Atlas connection URI |
| JWT_SECRET   | Secret key for JWT signing   |
| CLIENT_URL   | Frontend URL for CORS        |

### `client/.env`

| Variable      | Description            |
|---------------|------------------------|
| VITE_API_URL  | Backend API base URL   |

---

##  Author

**Your Name**
- GitHub: [@bushrabatool0605](https://github.com/bushrabatool)
- Assessment for: XDevFlow Internship

---

##  License

This project is built for internship assessment purposes.