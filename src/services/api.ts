import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove
  } from "firebase/firestore";
  import { firestore } from '../firebase/config';
  import { Event } from '../types/Event';
  
  // Fetch all events
  export const getEvents = async (): Promise<{ events: Event[] }> => {
    const snapshot = await getDocs(collection(firestore, "events"));
    const events = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as Event[];
    return { events };
  };
  
  // Fetch a single event by ID
  export const getEvent = async (id: string): Promise<Event> => {
    const eventRef = doc(firestore, "events", id);
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) throw new Error("Event not found");
    return { id: eventSnap.id, ...eventSnap.data() } as Event;
  };
  
  // Create a new event
  export const createEvent = async (event: Omit<Event, "id" | "participants"> & { createdBy: string }) => {
    const docRef = await addDoc(collection(firestore, "events"), {
      ...event,
      participants: []
    });
    return docRef.id;
  };
  
  // Update an event
  export const updateEvent = async (id: string, data: Partial<Event>) => {
    const eventRef = doc(firestore, "events", id);
    await updateDoc(eventRef, data);
  };
  
  // Delete an event
  export const deleteEvent = async (id: string) => {
    const eventRef = doc(firestore, "events", id);
    await deleteDoc(eventRef);
  };
  
  // Sign up a user to an event
  export const joinEvent = async (eventId: string, userId: string) => {
    const eventRef = doc(firestore, "events", eventId);
    await updateDoc(eventRef, {
      participants: arrayUnion(userId)
    });
  };
  
  // Remove user from an event
  export const leaveEvent = async (eventId: string, userId: string) => {
    const eventRef = doc(firestore, "events", eventId);
    await updateDoc(eventRef, {
      participants: arrayRemove(userId)
    });
  };