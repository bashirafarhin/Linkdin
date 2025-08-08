# 🔗 Mini LinkedIn Clone – Community Platform

This is a mini LinkedIn-like community platform built as part of the Full Stack Development Internship challenge from Internshala.

> 📸 This project was built to match these requirements.

---

## 🌐 Live Links
- **Video Demo**: [Click here](https://github.com/user-attachments/assets/da286cb8-7551-46d8-bd1b-80a7d40d1859)
- **Frontend (Next.js + TypeScript on Vercel)**: [Click here](https://linkdin-mauve.vercel.app/)
- **Backend (Node.js + Express + TypeScript on Render)**: [Click here](https://linkdin-g0nm.onrender.com)

---

## 🛠️ Tech Stack

### 📦 Frontend

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form + Zod** (form validation)
- **Axios** (for HTTP requests)

### 🧠 Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT + bcrypt** (for secure authentication)
- **CORS, Cookie-Parser** (for production-ready APIs)

### 🌍 Hosting

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## ✨ Features

### 🔐 Authentication

- User registration and login with email & password
- JWT-based authentication with secure cookies
- Profile with name, email, and editable bio
- Auto login state persistence using HTTP-only cookies

### 📝 Public Post Feed

- Users can create, view, and read **text-only posts**
- Home feed displays all posts chronologically with:
  - Author name
  - Timestamp

### 👤 Profile Page

- Public profile page for each user
- Displays profile info and user’s own posts

---

## Test Crendentials

```
email-test@test.com
password-Ba@123
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/linkedin-clone.git
cd linkedin-main
```

### 2. Install both frontend and backend dependencies

- client

```bash
npm install
```

- server

```

npm install
```

### 3. Create Environment Variables

- server/.env

```bash
NODE_ENV=development
PORT=8000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=
```

- client/.env

```bash
NEXT_PUBLIC_API="http://localhost:8000"
```

### 4. Run the App Locally

- client

```bash
npm run dev

```

- server

```bash
npm run build
node server.js

```

## 🧪 Bonus Features (Optional)

- Logout functionality
- Toast notifications for success/error
- Custom error handling middleware
- Auto-auth persistence using cookies
- Loading indicators while fetching data
- Form validation with helpful messages
