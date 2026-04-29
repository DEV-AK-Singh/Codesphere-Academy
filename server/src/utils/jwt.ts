import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/user.type";

const accessSecret = process.env["ACCESS_TOKEN_SECRET"];
const accessSecretExpiry = process.env["ACCESS_TOKEN_EXPIRY"] || "15m";
const refreshSecret = process.env["REFRESH_TOKEN_SECRET"];
const refreshSecretExpiry = process.env["REFRESH_TOKEN_EXPIRY"] || "7d";

export const generateAccessToken = (payload: TokenPayload) =>
  jwt.sign(payload, accessSecret as string, { expiresIn: accessSecretExpiry as any });

export const generateRefreshToken = (payload: TokenPayload) =>
  jwt.sign(payload, refreshSecret as string, { expiresIn: refreshSecretExpiry as any });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, accessSecret as string);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, refreshSecret as string);
