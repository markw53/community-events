import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  Button 
} from '@mui/material';
import { EventNote, GroupAdd, CalendarMonth } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container>
      {/* Welcome Header */}
      <Box textAlign="center" my={5}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Community Events
        </Typography>
      </Box>

      {/* Feature Boxes */}
      <Grid container spacing={3} justifyContent="center" my={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
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
      </Grid>

      {/* User Dashboard Section */}
      <Box 
        bgcolor="primary.main" 
        color="white" 
        p={4} 
        borderRadius={2} 
        my={4}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, User!
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