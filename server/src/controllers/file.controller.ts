import { Request, Response } from 'express';
import { FileService } from '../services/file.service.js'; 
import fs from 'fs';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const { isImage, resize, optimize } = req.body;
    const file = await FileService.saveFile(req.file, userId, {
      isImage: isImage === 'true',
      resize: resize ? JSON.parse(resize) : undefined,
      optimize: optimize === 'true'
    });
    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: file.id,
        filename: file.originalName,
        url: file.url,
        size: file.size,
        mimeType: file.mimeType
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

export const uploadMultipleFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({ error: 'No files uploaded' });
      return;
    }
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const files = req.files as Express.Multer.File[];
    const uploadedFiles = [];
    for (const file of files) {
      const savedFile = await FileService.saveFile(file, userId, {
        isImage: file.mimetype.startsWith('image/')
      });
      uploadedFiles.push({
        id: savedFile.id,
        filename: savedFile.originalName,
        url: savedFile.url,
        size: savedFile.size
      });
    }
    res.status(201).json({
      message: `${uploadedFiles.length} files uploaded successfully`,
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};

export const getUserFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const files = await FileService.getUserFiles(userId);
    res.json({ files });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileId } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    await FileService.deleteFile(fileId as string, userId);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete file error:', error);
    if (error instanceof Error && error.message === 'File not found or unauthorized') {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Failed to delete file' });
  }
};

export const updateProfileImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    if (!req.file.mimetype.startsWith('image/')) {
      res.status(400).json({ error: 'File must be an image' });
      return;
    }
    const result = await FileService.updateProfileImage(userId, req.file);
    res.json({
      message: 'Profile image updated successfully',
      user: result.user,
      file: result.file
    });
  } catch (error) {
    console.error('Profile image error:', error);
    res.status(500).json({ error: 'Failed to update profile image' });
  }
};

export const getFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileId } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const file = await FileService.getFile(fileId as string, userId);
    if (!fs.existsSync(file.path)) {
      res.status(404).json({ error: 'File not found on server' });
      return;
    }
    res.sendFile(file.path, { root: process.cwd() });
  } catch (error) {
    console.error('Get file error:', error);
    if (error instanceof Error && error.message === 'File not found or unauthorized') {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
};

export const downloadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileId } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const file = await FileService.getFile(fileId as string, userId);
    if (!fs.existsSync(file.path)) {
      res.status(404).json({ error: 'File not found on server' });
      return;
    }
    res.download(file.path, file.originalName);
  } catch (error) {
    console.error('Download error:', error);
    if (error instanceof Error && error.message === 'File not found or unauthorized') {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Failed to download file' });
  }
};