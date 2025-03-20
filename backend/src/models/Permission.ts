import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";

export interface IPermission extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const PermissionSchema: Schema<IPermission> = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true, trim: true }
    },
    { timestamps: true }
);

export default mongoose.model<IPermission>("Permission", PermissionSchema);
