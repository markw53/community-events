import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EventList from './components/Events/EventList';
import CreateEvent from './components/Events/CreateEvent';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/" element={<EventList />} />
      </Routes>
    </Router>
  );
};

export default App;