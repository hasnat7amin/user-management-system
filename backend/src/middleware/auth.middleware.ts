import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Users, { IUser } from "../models/Users";
import { errorResponse } from "../utils/response";
import { AuthRequest } from "../types/middleware.types";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
        if (!token) {
            return errorResponse(res, "Unauthorized", 401);
        }
        const decoded: any = await jwt.verify(token, process.env.JWT_SECRET!);
        const user = await Users.findById(decoded.userId);
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }
        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return errorResponse(res, "Invalid token", 401);
    }
};
