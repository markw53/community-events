export interface Event {
  id?: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  capacity: number;
  createdBy: string;
  participants: string[];
}