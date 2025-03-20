import { Router } from "express";
import { addProduct, fetchProduct, fetchAllProducts, modifyProduct, removeProduct } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkPermission } from "../middleware/permission.middleware";
import { asyncHandler } from "../helpers/async_handler";

const router: Router = Router();

router.post("/", asyncHandler(authMiddleware), asyncHandler(checkPermission("CREATE_PRODUCT")), addProduct);
router.get("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_PRODUCT")), fetchProduct);
router.get("/", asyncHandler(authMiddleware), asyncHandler(checkPermission("VIEW_PRODUCT")), fetchAllProducts);
router.put("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("EDIT_PRODUCT")), modifyProduct);
router.delete("/:id", asyncHandler(authMiddleware), asyncHandler(checkPermission("DELETE_PRODUCT")), removeProduct);

export default router;
