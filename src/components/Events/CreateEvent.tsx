// src/components/Events/CreateEvent.tsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/config';

const eventCategories = [
  'Music', 'Sports', 'Arts', 'Technology',
  'Food', 'Networking', 'Charity', 'Other'
];

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // format: YYYY-MM-DD
  const [time, setTime] = useState(''); // format: HH:mm
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [capacity, setCapacity] = useState<number>(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !date || !time || !location || !category) {
      setError('Please fill in all required fields');
      return;
    }

    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const jsDate = new Date(year, month - 1, day, hours, minutes);

    if (isNaN(jsDate.getTime())) {
      setError("Invalid date or time");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("Not authenticated");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(firestore, "events"), {
        title,
        description,
        date: Timestamp.fromDate(jsDate),
        time,
        location,
        category,
        capacity,
        createdBy: currentUser.uid,
        participants: []
      });
      // Optionally redirect or clear fields here
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setLocation('');
      setCategory('');
      setCapacity(0);
      setError('');
      alert("Event created!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create event.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ marginTop: 4, padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Event
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth margin="normal" label="Event Title" value={title}
            onChange={e => setTitle(e.target.value)} required
          />
          <TextField
            fullWidth margin="normal" label="Description" multiline rows={4}
            value={description} onChange={e => setDescription(e.target.value)} required
          />
          <TextField
            fullWidth margin="normal" label="Date" type="date" InputLabelProps={{ shrink: true }}
            value={date} onChange={e => setDate(e.target.value)} required
          />
          <TextField
            fullWidth margin="normal" label="Time" type="time" InputLabelProps={{ shrink: true }}
            value={time} onChange={e => setTime(e.target.value)} required
          />
          <TextField
            fullWidth margin="normal" label="Location"
            value={location} onChange={e => setLocation(e.target.value)} required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={e => setCategory(e.target.value)}
              required
            >
              {eventCategories.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            fullWidth margin="normal" label="Capacity" type="number" inputProps={{ min: 0 }}
            value={capacity} onChange={e => setCapacity(Number(e.target.value))}
          />
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          <Button
            type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEvent;