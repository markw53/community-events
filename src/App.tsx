import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EventList from './components/Events/EventList';
import CreateEvent from './components/Events/CreateEvent';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust as needed
    },
    secondary: {
      main: '#dc004e', // Adjust as needed
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;