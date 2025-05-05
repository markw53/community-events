import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // adjust path if needed

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
          {/* Always visible */}
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/events">Events</Button>
          
          {/* Only staff can create event */}
          {currentUser?.role === 'staff' && (
            <Button color="inherit" component={Link} to="/create-event">
              Create Event
            </Button>
          )}

          {/* Don't show auth buttons while loading */}
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