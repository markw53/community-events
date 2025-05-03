export interface Event {
    id?: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    createdBy: string;
    participants: string[];
  }