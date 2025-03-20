import { Router } from "express";
import { createRole, updateRole, deleteRole, getRoleById, getAllRoles } from "../controllers/role.controller";
import { authMiddleware } from "../middleware/auth.middleware"; // Ensure authentication
import { asyncHandler } from "../helpers/async_handler";
import { checkPermission } from "../middleware/permission.middleware";

const router: Router = Router();

router.post("/", asyncHandler(authMiddleware), asyncHandler(checkPermission("CREATE_ROLE")), createRole);
router.put("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("UPDATE_ROLE")), updateRole);
router.get("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_ROLE")), getRoleById);
router.get("/", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_ROLE")), getAllRoles);
router.delete("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("DELETE_ROLE")), deleteRole);

export default router;




