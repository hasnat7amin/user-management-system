import Product, { IProduct } from "../models/Product";

export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  return await Product.create(data);
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate("owner", "name email");
};

export const updateProduct = async (id: string, data: Partial<IProduct>): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find().populate("owner", "name email");
};
