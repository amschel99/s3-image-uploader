import express from 'express';
import multer from 'multer';

import { UploadController } from '../controllers';
import {upload } from '../config/multerConfig';

const router = express.Router();



router.post("/upload", upload.single('uploaded_file'), UploadController.Upload);

export { router };