# Full Stack Auth App — Login & Signup

A fully functional **Authentication System** built using **React.js**, **Node.js**, **Express**, and **Zod**. This app allows users to **signup**, **login**, and securely store auth tokens using `localStorage`. Backend is connected via **REST APIs** and features validations on both ends.

---

## Features

- Toggle between Login & Signup forms
- Form validation using **Zod**
- Secure user authentication via **JWT**
- Data storage with **MySQL**
- Integrated Frontend & Backend
- Modular and clean codebase
- Token storage via localStorage
- Error handling with descriptive messages
- Custom CSS styling with responsive layout

---

## Tech Stack

### Frontend

- React.js
- React Hook Form
- Zod
- React Query
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT (Authentication)
- MySQL
- bcrypt.js (Password Hashing)
- dotenv
- CORS

---

## API Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Authenticate user   |

> Base URL: `http://localhost:5000`

---

## Getting Started

### Backend Setup

1. Navigate to backend folder:

   ```bash
   cd authassignmentB
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   PORT=5000
   DATABASE_URL=your_mySQL_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start backend server:
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. Navigate to frontend folder:

   ```bash
   cd authassignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## Form Validation Rules

- **Email** must be valid
- **Password** must be at least 6 characters
- **Confirm Password** (on signup) must match password

All validations are handled client-side with **Zod**, and server-side using **Express Validator / Custom Logic**.

---

## Sample Test User

```txt
Email: test@example.com
Password: test1234

Email: mytest021@gmail.com
Password: mytest
```

---

## Folder Overview

Both backend and frontend have modular, clean, and component-based file organization with clear separation of concerns.

---

## Design Decisions

- Used **React Query** for efficient and scalable API state management
- Employed **Zod** for elegant schema-based validation
- JWT stored in **localStorage** for maintaining login session
- Error messages shown instantly from server or validation schema
- CORS enabled in backend to allow secure cross-origin requests

---

## Developed by

**Anjali Kashyap**  
B.Tech CSE | DRIEMS University  
GitHub: (https://github.com/kashyapanjali)

---
