import type { User, Role } from "../generated/prisma/browser"; 

export interface TokenPayload {
  id: string;
  email: string;
  role: Role;
}

export interface AccessTokenPayload extends TokenPayload {
  type: "access";
}

export interface RefreshTokenPayload {
  id: string;
  tokenId: string;
  type: "refresh";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceInfo?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  tokens: AuthTokens;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface SessionInfo {
  id: string;
  deviceInfo: string | null;
  ipAddress: string | null;
  lastActivity: Date;
  isActive: boolean;
}
