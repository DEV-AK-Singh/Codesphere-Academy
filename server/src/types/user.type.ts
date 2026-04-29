export interface UserCreateInput {
    email: string;
    phone: string;
    username: string;
    password: string;
}

export interface UserUpdateInput {
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    isActive?: boolean;
    role?: 'ADMIN' | 'USER' | 'MODERATOR';
}

export interface User {
    id: string;
    email: string;
    phone: string;
    username: string; 
    isActive: boolean; 
    role: 'ADMIN' | 'USER' | 'MODERATOR';
    createdAt: Date;
    updatedAt: Date;
}

export interface TokenPayload {
    userId: string;
    email: string;
    username: string;
}