import { Request, Response } from "express";
import {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProducts
} from "../services/product.service";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../types/middleware.types";

export const addProduct = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        if (!req.user) {
            return errorResponse(res, "Unauthorized request", 401);
        }
        const { name, description, price } = req.body;
        const product = await createProduct({ name, description, price, owner: req.user._id });
        return successResponse(res, product, "Product added successfully", 201);
    } catch (error: any) {
        return errorResponse(res, error.message, 400);
    }
};

export const fetchProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) return errorResponse(res, "Product not found", 404);
        return successResponse(res, product, "Product fetched successfully", 200);
    } catch (error: any) {
        return errorResponse(res, error.message, 400);
    }
};

export const fetchAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await getAllProducts();
        return successResponse(res, products, "Products fetched successfully", 200);
    } catch (error: any) {
        return errorResponse(res, error.message, 400);
    }
};

export const modifyProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        if (!updatedProduct) return errorResponse(res, "Product not found", 404);
        return successResponse(res, updatedProduct, "Product updated successfully", 200);
    } catch (error: any) {
        return errorResponse(res, error.message, 400);
    }
};

export const removeProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);
        if (!deletedProduct) return errorResponse(res, "Product not found", 404);
        return successResponse(res, deletedProduct, "Product deleted successfully", 200);
    } catch (error: any) {
        return errorResponse(res, error.message, 400);
    }
};
