import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; 
import { prisma } from '../utils/prisma.js';

export class FileService {
  private static uploadDir = path.join(process.cwd(), 'uploads'); 

  static async saveFile(file: Express.Multer.File, userId: string, options?: {
    isImage?: boolean;
    resize?: { width: number; height: number };
    optimize?: boolean;
  }): Promise<any> {
    try {
      let finalPath = file.path; 
      // Process image files (resize, optimize)
      if (options?.isImage && file.mimetype.startsWith('image/')) {
        const processedPath = path.join(this.uploadDir, `processed-${file.filename}`);
        let processor = sharp(file.path);
        if (options.resize) {
          processor = processor.resize(options.resize.width, options.resize.height, {
            fit: 'cover',
            position: 'center'
          });
        }
        if (options.optimize) {
          processor = processor.jpeg({ quality: 80 }).png({ quality: 80 });
        }
        await processor.toFile(processedPath);
        finalPath = processedPath; 
        fs.unlinkSync(file.path);
      } else { 
        const newPath = path.join(this.uploadDir, file.filename);
        fs.renameSync(file.path, newPath);
        finalPath = newPath;
      }
      const fileUrl = `/uploads/${path.basename(finalPath)}`;
      const savedFile = await prisma.file.create({
        data: {
          filename: path.basename(finalPath),
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: finalPath,
          url: fileUrl,
          userId: userId
        }
      });
      return savedFile;
    } catch (error) {
      // Clean up temp file if exists
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  }

  static async deleteFile(fileId: string, userId: string): Promise<boolean> {
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: userId
      }
    });
    if (!file) {
      throw new Error('File not found or unauthorized');
    }
    // Delete physical file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    // Delete from database
    await prisma.file.delete({
      where: { id: fileId }
    });
    return true;
  }

  static async getUserFiles(userId: string): Promise<any[]> {
    return await prisma.file.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getFile(fileId: string, userId: string): Promise<any> {
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: userId
      }
    });
    if (!file) {
      throw new Error('File not found or unauthorized');
    }
    return file;
  }

  static async updateProfileImage(userId: string, file: Express.Multer.File): Promise<any> {
    // Process and save profile image
    const savedFile = await this.saveFile(file, userId, {
      isImage: true,
      resize: { width: 500, height: 500 },
      optimize: true
    });
    // Update user's profile image reference
    const user = await prisma.user.update({
      where: { id: userId },
      data: { profileImage: savedFile.url },
      select: {
        id: true,
        email: true,
        profileImage: true
      }
    });
    return { user, file: savedFile };
  }
}