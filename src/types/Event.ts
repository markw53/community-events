import { Timestamp } from 'firebase/firestore';

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: Timestamp; // <--- Use Firestore's Timestamp object
  time: string;
  location: string;
  category: string;
  capacity: number;
  createdBy: string;
  participants: string[];
}