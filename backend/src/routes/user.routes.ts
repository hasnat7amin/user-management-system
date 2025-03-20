import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getProfile,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { asyncHandler } from "../helpers/async_handler";
import { checkPermission } from "../middleware/permission.middleware";

const router = Router();

router.get("/", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_USERS")), getAllUsers); // Fetch all users
router.get("/profile", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_USERS")), getProfile); // Get own profile
router.get("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_USERS")), getUserById); // Fetch a user by ID
router.put("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("UPDATE_USERS")), updateUser); // Update user details
router.delete("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("DELETE_USERS")), deleteUser); // Delete a user

export default router;
