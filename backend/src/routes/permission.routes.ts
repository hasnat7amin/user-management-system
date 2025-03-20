import { Router } from "express";
import { createPermission, updatePermission, deletePermission, getAllPermissions, getPermissionById } from "../controllers/permission.controller";
import { authMiddleware } from "../middleware/auth.middleware"; // Ensure authentication
import { asyncHandler } from "../helpers/async_handler";
import { checkPermission } from "../middleware/permission.middleware";

const router: Router = Router();

router.post("/", asyncHandler(authMiddleware), asyncHandler(checkPermission("CREATE_PERMISSION")), createPermission);
router.put("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("UPDATE_PERMISSION")), updatePermission);
router.delete("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("DELETE_PERMISSION")), deletePermission);
router.get("/", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_PERMISSION")), getAllPermissions);
router.get("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_PERMISSION")), getPermissionById);

export default router;
