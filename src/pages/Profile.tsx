import React, { useEffect, useState } from 'react';
import {
  Typography, Box, TextField, Button, List, ListItem, ListItemText, Divider, CircularProgress
} from '@mui/material';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { Event } from '../types/Event'; // Adjust path as needed

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [events, setEvents] = useState<Event[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [message, setMessage] = useState('');

  // Update display name field if user changes (hot reload)
  useEffect(() => {
    setDisplayName(currentUser?.displayName || '');
  }, [currentUser]);

  // Fetch events the user has joined
  useEffect(() => {
    if (!currentUser) return;
    setLoadingEvents(true);
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(firestore, 'events'));
      const joined: Event[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Event;
        if (Array.isArray(data.participants) && data.participants.includes(currentUser.uid)) {
          joined.push({ id: docSnap.id, ...data });
        }
      });
      setEvents(joined);
      setLoadingEvents(false);
    };
    fetchEvents();
  }, [currentUser]);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);
    setMessage('');
    try {
      const userRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userRef, { displayName });
      setMessage('Profile updated!');
      // Optionally: Refresh user in context by force-reloading or updating the context
      // For now, we'll just show the message:
    } catch {
      setMessage('Error updating profile.');
    }
    setSaving(false);
  };

  if (!currentUser) {
    return (
      <Box p={4}>
        <Typography variant="h6">
          Please log in to view your profile.
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" p={4}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <form onSubmit={handleProfileUpdate}>
        <Box display="flex" flexDirection="column" maxWidth={400} gap={2} my={2}>
          <TextField
            label="Display Name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            fullWidth
            disabled={saving}
          />
          <Button variant="contained" type="submit" disabled={saving}>
            Save
          </Button>
          {message && (
            <Typography variant="body2" color={message === 'Profile updated!' ? 'success.main' : 'error'}>
              {message}
            </Typography>
          )}
        </Box>
      </form>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Your Joined Events
      </Typography>
      {loadingEvents ? (
        <CircularProgress />
      ) : (
        <List>
          {events.length === 0 ? (
            <Typography variant="body1">You haven't joined any events yet.</Typography>
          ) : (
            events.map(ev => (
              <ListItem key={ev.id}>
                <ListItemText
                  primary={ev.title}
                  secondary={
                    <>
                      {ev.date && (
                        <>
                          {ev.date.toDate().toLocaleDateString()}{" "}
                          {ev.date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {" — "}
                        </>
                      )}
                      {ev.location}
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      )}
    </Box>
  );
};

export default Profile;