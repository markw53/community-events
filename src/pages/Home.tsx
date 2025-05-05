import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { EventNote, GroupAdd, CalendarMonth } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <Container>
      {/* Welcome Header */}
      <Box textAlign="center" my={5}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Community Events
        </Typography>
      </Box>

      {/* Feature Boxes (centered, 3 per row on desktop) */}
      <Box maxWidth={1200} mx="auto" my={4}>
        <Grid 
          columns={{ xs: 1, sm: 2, md: 3 }} 
          gap={3}
        >
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <EventNote color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Discover Events
              </Typography>
              <Typography variant="body2">
                Browse through upcoming events in your community
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <GroupAdd color="secondary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Join Events
              </Typography>
              <Typography variant="body2">
                Sign up for events that interest you
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <CalendarMonth color="success" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Calendar Integration
              </Typography>
              <Typography variant="body2">
                Add events to your personal calendar
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Box>

      {/* User Dashboard Section */}
      <Box 
        bgcolor="primary.main" 
        color="white" 
        p={4} 
        borderRadius={2} 
        my={4}
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {currentUser?.displayName || 'User'}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Check out the latest events or view your profile.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            component={Link}
            to="/events"
          >
            Latest Events
          </Button>
          <Button 
            variant="outlined" 
            color="inherit"
            size="large"
            component={Link}
            to="/profile"
          >
            Your Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;