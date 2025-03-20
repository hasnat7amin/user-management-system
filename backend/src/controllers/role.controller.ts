import { Request, Response } from "express";
import Role from "../models/Role";
import { successResponse, errorResponse } from "../utils/response";

// Create a new role
export const createRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, permissions } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole) return errorResponse(res, "Role already exists", 400);

        const role = await Role.create({ name, permissions });
        return successResponse(res, role, "Role created successfully", 201);
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Get all roles
export const getAllRoles = async (req: Request, res: Response): Promise<any> => {
    try {
        const roles = await Role.find().populate("permissions", "name");
        return successResponse(res, roles, "Roles fetched successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Get a single role by ID
export const getRoleById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id).populate("permissions", "name");
        if (!role) return errorResponse(res, "Role not found", 404);

        return successResponse(res, role, "Role fetched successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Update role
export const updateRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, permissions } = req.body;

        const role = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });
        if (!role) return errorResponse(res, "Role not found", 404);

        return successResponse(res, role, "Role updated successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};

// Delete role
export const deleteRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const role = await Role.findByIdAndDelete(id);
        if (!role) return errorResponse(res, "Role not found", 404);

        return successResponse(res, {}, "Role deleted successfully");
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
};
