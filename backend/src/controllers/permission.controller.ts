import { Request, Response } from "express";
import Permission from "../models/Permission";
import { successResponse, errorResponse } from "../utils/response";

// Create a new permission
export const createPermission = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description } = req.body;

        const existingPermission = await Permission.findOne({ name });
        if (existingPermission) return errorResponse(res, "Permission already exists", 400);

        const permission = await Permission.create({ name, description });
        return successResponse(res, permission, "Permission created successfully", 201);
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Get all permissions
export const getAllPermissions = async (req: Request, res: Response): Promise<any> => {
    try {
        const permissions = await Permission.find();
        return successResponse(res, permissions, "Permissions fetched successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Get a single permission by ID
export const getPermissionById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const permission = await Permission.findById(id);
        if (!permission) return errorResponse(res, "Permission not found", 404);

        return successResponse(res, permission, "Permission fetched successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Update permission
export const updatePermission = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const permission = await Permission.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!permission) return errorResponse(res, "Permission not found", 404);

        return successResponse(res, permission, "Permission updated successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Delete permission
export const deletePermission = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const permission = await Permission.findByIdAndDelete(id);
        if (!permission) return errorResponse(res, "Permission not found", 404);

        return successResponse(res, {}, "Permission deleted successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};
