import { Session, SessionData } from "express-session";
import { UserDocument } from "../models/user.model";

export type SessionType = Session & SessionData;

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    user: UserDocument;
  }
}
