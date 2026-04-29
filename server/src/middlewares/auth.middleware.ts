import type { Request, Response, NextFunction } from "express";
import type { TokenPayload } from "../types/user.type";
import { verifyAccessToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized access token!" });
    return;
  }
  try {
    const payload = verifyAccessToken(token) as TokenPayload; 
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid/Expired access token!" });
    return;
  }
};
