import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  getUserProfile,
  modifyUser,
  removeUser,
} from "../services/user.service";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../types/middleware.types"; // Type for authenticated user

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const users = await findAllUsers();
    return successResponse(res, users, "Users fetched successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return errorResponse(res, "User not found", 404);
    return successResponse(res, user, "User fetched successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedUser = await modifyUser(req.params.id, req.body);
    if (!updatedUser) return errorResponse(res, "User not found", 404);
    return successResponse(res, updatedUser, "User updated successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedUser = await removeUser(req.params.id);
    if (!deletedUser) return errorResponse(res, "User not found", 404);
    return successResponse(res, null, "User deleted successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    if (!req.user) return errorResponse(res, "Unauthorized", 401);
    const userProfile = await getUserProfile(req.user._id.toString());
    return successResponse(res, userProfile, "Profile fetched successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};
