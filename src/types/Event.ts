import { Timestamp } from 'firebase/firestore';

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: Timestamp; 
  endDate?: Timestamp; 
  time: string;
  location: string;
  category: string;
  capacity: number;
  createdBy: string;
  participants: string[];
}

