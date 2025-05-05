# Community Events Platform

A modern web application for managing community events using **React**, **TypeScript**, **Firebase**, and **Material-UI**.  
Features include authentication, role-based access control, event creation/joining, and a clean, responsive user interface.

---

## 🚀 Features

- **User Authentication** – Firebase Auth with Login, Registration, and Logout
- **Role-Based Access Control** – Staff and Member roles
- **Event Management** – Staff can create events, all users can view and join
- **Firestore Integration** – Real-time event and user data
- **Responsive UI** – Material-UI components and layouts

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Firebase (Auth + Firestore)](https://firebase.google.com/)
- [Material-UI](https://mui.com/)

---

## 📦 Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/community-events-platform.git
   cd community-events-platform

2. **Install dependencies:**
  ```bash
  1 npm install
  ```

3. **Configure Firebase:**
    In the FIrebase console, create a new preject.
    Enable Email/Password authentification.
    Create a FIrestore database.
    Copy your Firebase config into a '.env' file:

  ```bash
    VITE_FIREBASE_API_KEY=...
    VITE_FIREBASE_AUTH_DOMAIN=...
    VITE_FIREBASE_PROJECT_ID=...
    VITE_FIREBASE_STORAGE_BUCKET=...
    VITE_FIREBASE_MESSAGING_SENDER_ID=...
    VITE_FIREBASE_APP_ID=...