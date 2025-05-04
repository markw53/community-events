import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Box,
  CircularProgress
} from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { Event } from '../../types/Event';

// Removed unused dateValue and dateString logic

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events from Firestore
        const eventsRef = collection(firestore, 'events');
        const eventsSnapshot = await getDocs(eventsRef);
        
        const fetchedEvents = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Event));

        setEvents(fetchedEvents);
        setLoading(false);
      } catch (err: unknown) {
        setError('Failed to fetch events');
        setLoading(false);
        if (err instanceof Error) {
          console.error('Events fetch error:', err.message);
        } else {
          console.error('Events fetch error:', err);
        }
      }
    };

    fetchEvents();
  }, []);

  const handleJoinEvent = (eventId: string) => {
    // Implement event joining logic
    console.log(`Joining event ${eventId}`);
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      {events.length === 0 ? (
        <Typography variant="body1">
          No events found. Check back later!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item={true} xs={12} md={4} key={event.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Box mt={2}>
                  <Typography variant="body2">
                    Date: {
                      event.date
                        ? typeof event.date === 'string'
                          ? new Date(event.date).toLocaleDateString()
                          : event.date instanceof Date
                            ? event.date.toLocaleDateString()
                            : ''
                        : ''
                    }
                  </Typography>
                    <Typography variant="body2">
                      Time: {event.time}
                    </Typography>
                    <Typography variant="body2">
                      Location: {event.location}
                    </Typography>
                    <Typography variant="body2">
                      Category: {event.category}
                    </Typography>
                    <Typography variant="body2">
                      Capacity: {event.capacity}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => handleJoinEvent(event.id!)}
                  >
                    Join Event
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EventList;