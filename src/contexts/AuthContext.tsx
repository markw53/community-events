import { createContext } from 'react';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'staff' | 'member';
}

export interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);