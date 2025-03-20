// src/types/express.d.ts
import { IUser } from "../models/Users"; // Import your User model

declare module "express" {
  export interface Request {
    user?: IUser; // Add user property to Request
  }
}
