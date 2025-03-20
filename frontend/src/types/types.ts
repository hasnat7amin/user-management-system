export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export type UserProfileResponse = ApiResponse<UserProfile>;

export interface UserProfile {
    name: string;
    email: string;
    role: UserRole;
}

export interface UserRole {
    name: string;
    permissions: string[];
}


export interface Permissions {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}