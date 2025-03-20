import { UserProfileResponse } from "../types/types";

export const isPermitted = (userProfileData: UserProfileResponse, requiredPermission: string): boolean => {
    if (!userProfileData || !userProfileData.data) return false;
  
    const permissions = userProfileData.data.role?.permissions || [];
    return permissions.includes(requiredPermission);
  };
  