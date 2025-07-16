# DevTinder

A modern social platform for developers to connect, share, and collaborate. Built with a robust MERN stack and a beautiful, responsive UI.

---

## 🚀 Overview
DevTinder is a full-stack web application inspired by social and professional networks. It enables developers to:
- Create and share posts (with images)
- Discover and connect with other developers
- Enjoy a seamless, modern user experience with dark/light mode

---

## ✨ Features
- **Authentication:** Email/Password & Google OAuth
- **Create Post:** Modal with image upload, word limit, and live counter
- **Feed:** Infinite scroll, responsive cards, loading spinner
- **Suggested Friends:** Smart sidebar with connect actions
- **Dark/Light Mode:** Global toggle, persists user preference
- **Protected Routes:** Secure access to user-only pages
- **Modern UI:** Tailwind CSS, DaisyUI, and custom design

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Other:** Google OAuth, Cookies, Axios, React Router

---

## 🏗️ Architecture
```
DevTinder/
  devTinder-frontend/   # React + Tailwind frontend
  server/               # Express + MongoDB backend
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Rkhan76/DevTinder-frontend.git
cd DevTinder
```

### 2. Backend Setup
```bash
cd server
npm install
# Configure MongoDB URI and JWT secret in .env
npm start
```

### 3. Frontend Setup
```bash
cd ../devTinder-frontend
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## ⚙️ Environment Variables
- **Backend:** `.env` for `MONGO_URI`, `JWT_SECRET`, etc.
- **Frontend:** API endpoints in `src/api/`

---

## 📸 Screenshots
<!-- Add screenshots or GIFs here to showcase the UI -->

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or new features.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE). 


<!-- Work to do  on 16-07-2025 -->
1- design login and signup page
2- showing loading effect while login