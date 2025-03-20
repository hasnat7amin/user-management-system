import Users from "../models/Users";

export const findAllUsers = async () => {
  return await Users.find().select("name email role createdAt").populate({
    path: "role",
    populate: { path: "permissions", select: "name" },
  });
};

export const getUserProfile = async (id: string) => {

  const populatedUser: any = await Users.findById(id)
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
  return formattedUser;

}

export const findUserById = async (id: string) => {
  return await Users.findById(id).select("name email role").populate({
    path: "role",
    populate: { path: "permissions", select: "name" },
  });
};

export const modifyUser = async (id: string, userData: any) => {
  return await Users.findByIdAndUpdate(id, userData, { new: true });
};

export const removeUser = async (id: string) => {
  return await Users.findByIdAndDelete(id);
};
