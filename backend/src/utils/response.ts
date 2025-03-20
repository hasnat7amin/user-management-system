import { Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Success Response Helper
 * @param res Express Response object
 * @param data Response data
 * @param message Success message
 * @param statusCode HTTP status code (default: 200)
 * @returns JSON response
 */
export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Error Response Helper
 * @param res Express Response object
 * @param message Error message
 * @param statusCode HTTP status code (default: 500)
 * @returns JSON response
 */
export const errorResponse = (
  res: Response,
  message = "An error occurred",
  statusCode = 500
): Response<ApiResponse<null>> => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
