// utils/date.ts
import { Timestamp } from 'firebase/firestore';

export function formatEventDate(ts?: Timestamp) {
  try {
    return ts ? ts.toDate().toLocaleDateString() : '';
  } catch {
    return '';
  }
}

export function formatEventTime(ts?: Timestamp) {
  try {
    return ts ? ts.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
  } catch {
    return '';
  }
}