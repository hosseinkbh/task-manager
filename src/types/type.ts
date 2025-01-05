import { Session, SessionData } from "express-session";

export type SessionType = Session & SessionData;

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    user: {
      id: String;
      lastName: String;
      firstName: String;
      email: String;
      phoneNumber: String;
    };
  }
}
