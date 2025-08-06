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

<!-- Problem i am facing during project developemnt -->
1- problem of erasing the redux store data on refreshing the application  => soln use redux-presistance
2- 

<!-- Work to do -->
1- navbar avtar show user image and if image is not present then show the name letter  =>  // Done
2- show the image of the user in his post if present or show the letter of the name => Done
3- Add image to the post and save image to a cloud like cloudinary or firebase => 

<!--Major tasks to do on app-->
1- Optimize the frontend
2- Role Based Access
3- make the ui better
4- make the ui responsive

<!-- Main parts of application -->
1- posts
    => user
       => add post
         => fix ui
         => open the modal if user add the image first
         => open the modal if user try to write a post
       => edit post
       => delete post
2- chat application
3- notification
4- friend request
5- user profile
6- role based access


<!-- Today work to do -->
1- add post ui + backend