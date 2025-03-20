import { Request } from "express";
import { IUser } from "../models/Users";

export interface AuthRequest extends Request {
    user?: IUser;
}