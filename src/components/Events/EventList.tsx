import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { Event } from '../../types/Event';
import { useAuth } from '../../hooks/useAuth'; 
import { AddToGoogleCalendarButton } from '../AddToGoogleCalendarButton';

const EventList: React.FC = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(firestore, 'events');
        const eventsSnapshot = await getDocs(eventsRef);
        const fetchedEvents = eventsSnapshot.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as Event;
        });
        setEvents(fetchedEvents);
      } catch {
        // Optionally handle error here
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const joinEvent = async (eventId: string) => {
    if (!currentUser) return alert("Login to join events!");
    const eventRef = doc(firestore, "events", eventId);
    await updateDoc(eventRef, {
      participants: arrayUnion(currentUser.uid)
    });
    setEvents(events => events.map(ev =>
      ev.id === eventId
        ? { ...ev, participants: [...(ev.participants || []), currentUser.uid] }
        : ev
    ));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      {events.length === 0 ? (
        <Typography variant="body1">No events found. Check back later!</Typography>
      ) : (
        <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap={3}>
          {events.map(event => (
            <Card elevation={3} key={event.id}>
              <CardContent>
                <Typography variant="h5" gutterBottom>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">{event.description}</Typography>
                <Box mt={2}>
                  <Typography variant="body2">
                    Date: {event.date ? event.date.toDate().toLocaleDateString() : ''}
                  </Typography>
                  <Typography variant="body2">
                    Time: {event.date ? event.date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </Typography>
                  <Typography variant="body2">Location: {event.location}</Typography>
                  <Typography variant="body2">Category: {event.category}</Typography>
                  <Typography variant="body2">Capacity: {event.capacity}</Typography>
                  <Typography variant="body2">
                    Signed Up: {event.participants ? event.participants.length : 0}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  disabled={
                    !currentUser ||
                    (event.participants || []).includes(currentUser.uid) ||
                    (event.capacity > 0 && (event.participants?.length ?? 0) >= event.capacity)
                  }
                  onClick={() => joinEvent(event.id!)}
                >
                  {(event.participants || []).includes(currentUser?.uid || '') ? "Joined" : "Join Event"}
                </Button>
                {event.date && (
                  <AddToGoogleCalendarButton
                    event={{
                      title: event.title,
                      description: event.description,
                      location: event.location,
                      start: event.date.toDate(),
                      end: event.endDate
                        ? event.endDate.toDate()
                        : new Date(event.date.toDate().getTime() + 2 * 60 * 60 * 1000), // fallback: +2 hours
                    }}
                  />
                )}
              </CardActions>
            </Card>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EventList;