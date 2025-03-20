import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./Users";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  owner: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
