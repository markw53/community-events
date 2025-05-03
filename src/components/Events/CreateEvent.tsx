import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/config';
import { Event } from '../../types/Event';

const CreateEvent: React.FC = () => {
  const [event, setEvent] = useState<Omit<Event, 'id' | 'participants'>>({
    title: '',
    description: '',
    date: new Date(),
    time: '',
    location: '',
    category: '',
    capacity: 0,
    createdBy: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: name === 'date' ? new Date(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!event.title || !event.description || !event.date || !event.location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Get current user
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // Create event document
      const eventToSubmit = {
        ...event,
        createdBy: currentUser.uid,
        participants: []
      };

      // Add to Firestore
      const eventsRef = collection(firestore, 'events');
      await addDoc(eventsRef, eventToSubmit);

      // Redirect to events list
      navigate('/events');
    } catch (err: any) {
      setError(err.message);
      console.error('Event creation error:', err);
    }
  };

  const eventCategories = [
    'Music', 'Sports', 'Arts', 'Technology', 
    'Food', 'Networking', 'Charity', 'Other'
  ];

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          marginTop: 4, 
          padding: 4 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create New Event
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ width: '100%' }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Event Title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={event.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date"
            type="date"
            name="date"
            InputLabelProps={{ shrink: true }}
            value={event.date.toISOString().split('T')[0]}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Time"
            type="time"
            name="time"
            InputLabelProps={{ shrink: true }}
            value={event.time}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={event.category}
              label="Category"
              onChange={handleChange as any}
              required
            >
              {eventCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Capacity"
            type="number"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Event
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEvent;