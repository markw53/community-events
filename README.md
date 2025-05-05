Community Events Platform
A modern web application for managing community events using React, TypeScript, Firebase, and Material-UI.
Features include authentication, role-based access control, event creation/joining, and a clean, responsive user interface.

🚀 Features
User Authentication – Firebase Auth with Login, Registration, and Logout
Role-Based Access Control – Staff and Member roles
Event Management – Staff can create events, all users can view and join
Firestore Integration – Real-time event and user data
Responsive UI – Material-UI components and layouts
🛠️ Tech Stack
React
TypeScript
Vite
Firebase (Auth + Firestore)
Material-UI
📦 Project Setup
Clone the repository:

BASH

git clone https://github.com/markw53/community-events-platform.git
cd community-events-platform
Install dependencies:

BASH

npm install
Configure Firebase:

In the Firebase console, create a new project.
Enable Email/Password authentication.
Create a Firestore database.
Copy your Firebase config into a .env file:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
(Your code should import these from import.meta.env.)
Start the development server:

BASH

npm run dev
🧑‍💻 Project Structure

Collapse
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
🔐 Authentication & Roles
How Roles Work
Each user has a role: "staff" or "member", stored in Firestore under /users/{uid}.
Staff users can create events; members can only join events.
Assigning Roles
1. On Registration (Default to Member)
Users registering through the sign-up form are assigned the "member" role by default.
Example:
TypeScript

await setDoc(doc(db, 'users', userCredential.user.uid), {
  uid: userCredential.user.uid,
  email,
  displayName: userCredential.user.displayName || null,
  role: "member", // default
});
2. Promoting Users to Staff (For Admins Only)
Only an admin/staff can assign the "staff" role.
This can be done:
Manually in Firestore Console:
Go to /users in Firestore.
Open the target user's document.
Change the "role" field to "staff".
Or through a protected Admin Panel (you can build this feature as your project grows).
3. Fetching Roles in the App
On login or page load, we fetch the user document from Firestore to get their role:
React TSX

Collapse
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
4. Securing Role Changes
WARNING: Only admins should be able to change user roles.
Implement Firestore Security Rules:
Example rule to restrict who can assign the role field:
JavaScript

match /users/{userId} {
  allow write: if request.auth != null 
                && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "staff";
}
Adjust as needed for strictness.
🧩 Key Components
Navbar: Navigation with Home, Events, Create Event (staff only), Login/Logout (conditional)
EventList: Displays all events, lets users join
CreateEvent: Staff-only event creation form
AuthContext: Handles user state and provides role info
Custom Hooks: e.g., useAuth
✨ Example Navbar Code
React TSX

Collapse
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
🛡️ Security & Best Practices
Never let users assign themselves the "staff" role.
Restrict Firestore writes for the role field to privileged users only.
Handle loading state in your UI to prevent flicker between login/logout buttons.
💡 Future Enhancements
Admin Panel: for managing users and their roles.
Event RSVPs: add RSVP functionality and attendee lists.
Notifications: send reminders or updates to users.
Event Images: allow photo uploads with Firebase Storage.
🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

📝 License
MIT

Questions?
Open an issue or ask the maintainers. Happy coding!

