import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
import Users, { IUser } from "../models/Users";
import { AuthRequest } from "../types/middleware.types";
import { IRole } from "../models/Role";

export const checkPermission = (requiredPermission: string) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // Find user and populate role & permissions
            const user: IUser | null = await Users.findById(req?.user?._id)
                .populate({
                    path: "role",
                    populate: {
                        path: "permissions",
                        select: "name", // Only get permission names
                    },
                });

            if (!user || !user?.role) {
                return errorResponse(res, "User or role not found", 403);
            }

            const role = user.role as IRole;
            const userPermissions = role?.permissions.map((perm: any) => perm.name);

            if (!userPermissions.includes(requiredPermission)) {
                return errorResponse(res, "Access denied, you don't have the required permission.", 403);
            }

            next();
        } catch (error) {
            return errorResponse(res, "Authorization error", 403);
        }
    };
};
