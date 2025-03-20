import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";
import { IPermission } from "./Permission";

export interface IRole extends Document {
    _id: Types.ObjectId;
    name: string;
    permissions: mongoose.Types.ObjectId[] | IPermission[];
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema: Schema<IRole> = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        permissions: [{ type: Schema.Types.ObjectId, ref: "Permission", default: [] }]
    },
    { timestamps: true }
);

export default mongoose.model<IRole>("Role", RoleSchema);
