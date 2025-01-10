import { Session, SessionData } from 'express-session';

export type SessionType = Session & SessionData;

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean;
    user: {
      id: string;
      lastName: string;
      firstName: string;
      email: string;
      phoneNumber: string;
    };
  }
}
