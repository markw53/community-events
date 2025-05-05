# Community Events Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://community-events-online.web.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

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

### 1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/community-events-platform.git
   cd community-events-platform
   ```

### 2. Install dependencies

  ```bash
  1 npm install
  ```

### 3. Configure Firebase

- Enable Email/Password authentification.
- Create a FIrestore database.
- Copy your Firebase config into a `.env` file:
  
  ```bash
    VITE_FIREBASE_API_KEY=...
    VITE_FIREBASE_AUTH_DOMAIN=...
    VITE_FIREBASE_PROJECT_ID=...
    VITE_FIREBASE_STORAGE_BUCKET=...
    VITE_FIREBASE_MESSAGING_SENDER_ID=...
    VITE_FIREBASE_APP_ID=...
    ```

- (Your code should import these from `import.meta.env`.)

### 4. Start the development server

  ```bash
  npm run dev
  ```

---

## Test Accounts

**Regular User:**

- **Email:** 123@guest.com
- **Password:** guest1

**Staff User:**

- **Email:** 123@admin.com
- **Paswword:** admin1
  
## 🧑‍💻 Project Structure

  src/
│
├── components/
│   ├── Navbar.tsx
│   ├── EventList.tsx
│   └── CreateEvent.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── useAuth.ts
├── pages/
│   ├── Home.tsx
│   ├── Events.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── CreateEvent.tsx
├── types/
│   └── index.d.ts
├── firebase.ts
└── App.tsx

---

## 🔐 Authentication & Roles

### How Roles Work

- Each user has a role: "staff" or "member", stored in Firestore under `/users/{uid}`.
- Staff users can create events; members can only join events.

## Assigning Roles

### 1. On Registration (Default to Member)

- Users registering through the sign-up form are assigned the `member` role by default.
- Example

  TypeScript

  ```bash
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    uid: userCredential.user.uid,
    email,
    displayName: userCredential.user.displayName || null,
    role: "member", // default
  });
  ```

### 2. Promoting Users to Staff (For Admins Only)

- Only an admin/staff can assign the "staff" role.
- This can be done:
  - Manually in Firestore Console:
      1. Go to /users in Firestore.
      2. Open the target user's document.
      3. Change the "role" field to "staff".
  - Or through a protected Admin Panel (you can build this feature as your project grows).

### 3. Fetching Roles in the App

- On login or page load, we fetch the user document from Firestore to get their role.

  React TSX

  ```bash
    import { onAuthStateChanged } from 'firebase/auth';
  import { doc, getDoc } from 'firebase/firestore';
  // ...in AuthProvider:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data() as AuthUser);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  ```

### 4. Securing Role Changes

- WARNING: Only admins should be able to change user roles.
- Implement Firestore Security Rules:
- Example rule to restrict who can assign the role field:

  JavaScript

  ```bash
  match /users/{userId} {
    allow write: if request.auth != null 
                  && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "staff";
  }
  ```

---

### 🧩 Key Components

- Navbar: Navigation with Home, Events, Create Event (staff only), Login/Logout (conditional)
- EventList: Displays all events, lets users join
- CreateEvent: Staff-only event creation form
- AuthContext: Handles user state and provides role info
- Custom Hooks: e.g., useAuth

---

### ✨ Example Navbar Code

React TSX

  ```bash
  import React from 'react';
  import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
  import { Link } from 'react-router-dom';
  import { useAuth } from '../contexts/useAuth';

  const Navbar: React.FC = () => {
    const { currentUser, loading, logout } = useAuth();

    return (
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            COMMUNITY EVENTS
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/events">Events</Button>
            {currentUser?.role === 'staff' && (
              <Button color="inherit" component={Link} to="/create-event">Create Event</Button>
            )}
            {!loading && (
              currentUser ? (
                <Button color="inherit" onClick={logout}>Logout</Button>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  <Button color="inherit" component={Link} to="/register">Register</Button>
                </>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  export default Navbar;
  ```

---

### 🛡️ Security & Best Practices

- Never let users assign themselves the "staff" role.
- Restrict Firestore writes for the role field to privileged users only.
- Handle loading state in your UI to prevent flicker between login/logout buttons.

---

### 💡 Future Enhancements

- Admin Panel: for managing users and their roles.
- Event RSVPs: add RSVP functionality and attendee lists.
- Notifications: send reminders or updates to users.
- Event Images: allow photo uploads with Firebase Storage.

---

### 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT license - see the [LICENSE](./LICENSE) file for details

---
