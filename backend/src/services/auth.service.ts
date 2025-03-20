import Users, { IUser } from "../models/Users";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import Role from "../models/Role";

export const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await Users.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // Find the "User" role in the database
    const userRole = await Role.findOne({ name: "USER" });
    if (!userRole) throw new Error("Default 'USER' role not found. Please create it.");


    const user: IUser = await Users.create({ name, email, password, role: userRole._id });

    const populatedUser: any = await Users.findById(user._id)
        .populate({
            path: "role",
            select: "name permissions",
            populate: {
                path: "permissions",
                select: "name",
            },
        })
        .select("name email role");

    // Transform response: Map permissions to an array of strings
    const formattedUser = {
        name: populatedUser?.name,
        email: populatedUser?.email,
        role: {
            name: populatedUser?.role?.name,
            permissions: populatedUser?.role?.permissions.map((p: any) => p.name),
        },
    };


    return { user: formattedUser, token: generateToken(user._id.toString()) };
};

export const loginUser = async (email: string, password: string) => {
    const user: IUser | null = await Users.findOne({ email }).select("+password");
    if (!user) throw new Error("User not found.");
    console.log("isMatch", password, user.password, await comparePassword(password, user.password))
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const userId = user._id.toString();

    const populatedUser: any = await Users.findById(user._id)
        .populate({
            path: "role",
            select: "name permissions",
            populate: {
                path: "permissions",
                select: "name",
            },
        })
        .select("name email role");

    // Transform response: Map permissions to an array of strings
    const formattedUser = {
        name: populatedUser?.name,
        email: populatedUser?.email,
        role: {
            name: populatedUser?.role?.name,
            permissions: populatedUser?.role?.permissions.map((p: any) => p.name),
        },
    };


    return { user: formattedUser, token: generateToken(userId) };
};
