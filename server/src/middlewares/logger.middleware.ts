import type { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMessage = `[${new Date().toLocaleString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms\n`;
    console.log(logMessage.trim());
    if (process.env["NODE_ENV"] === "production") {
      const logDir = path.join(__dirname, "../../logs");
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
      }
      fs.appendFileSync(path.join(logDir, "access.log"), logMessage);
    }
  });

  next();
};
