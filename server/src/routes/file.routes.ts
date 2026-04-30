import { Router } from 'express';
import upload from '../utils/multer.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  uploadFile,
  uploadMultipleFiles,
  getUserFiles,
  deleteFile,
  updateProfileImage,
  getFile,
  downloadFile
} from '../controllers/file.controller.js';

const router = Router();

router.use(authenticate);
router.post('/upload', upload.single('file'), uploadFile);
router.post('/upload-multiple', upload.array('files', 10), uploadMultipleFiles);
router.post('/profile-image', upload.single('image'), updateProfileImage);
router.get('/files', getUserFiles);
router.get('/file/:fileId', getFile);
router.get('/download/:fileId', downloadFile);
router.delete('/file/:fileId', deleteFile);

export default router;