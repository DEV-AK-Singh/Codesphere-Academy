import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
    const token = jwt.sign({ userId }, process.env["JWT_SECRET"] as string, { expiresIn: '1h' });
    return token;
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env["JWT_SECRET"] as string);
}