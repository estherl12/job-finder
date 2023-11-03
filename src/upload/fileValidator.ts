import { BadRequestException } from '@nestjs/common';
import { diskStorage, memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import dayjs from 'dayjs';

import fs from 'fs';

export const imageUploadFilter: fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Only images are allowed!'), false);
  }
};

export const pdfUploadFilter: fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('application/pdf')) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Only pdfs are allowed!'), false);
  }
};

export const multerDiskStorage = diskStorage({
  destination: (req, _file, callback) => {
    // const category = req.body.category;
    // const date = dayjs().format('YYYY-MM');
    const fullDirectory = `./images`;

    // node.js create directory if doesn't exists
    // if (!fs.existsSync(fullDirectory)) {
    //   console.log('here');

    //   fs.mkdirSync(fullDirectory, { recursive: true });
    // }

    return callback(null, fullDirectory);
  },
  filename: (req, file, callback) => {
    const fileExt = extname(file.originalname);

    const userId = (req as any)?.id ?? 'unauth';
    const id = uuidv4().replace(/-/g, '');

    const fName = `${userId}-${Date.now()}-${id}${fileExt}`;

    callback(null, fName);
  },
});

export const multerMemoryStorage = memoryStorage();

export const multerDiskStoragePdf = diskStorage({
  destination: (_req, _file, callback) => {
    const category = _req.body.category;

    const date = dayjs().format('YYYY-MM');
    const fullDirectory = `./uploads/pdf/${category}/${date}`;

    // node.js create directory if doesn't exists
    if (!fs.existsSync(fullDirectory)) {
      fs.mkdirSync(fullDirectory, { recursive: true });
    }

    return callback(null, fullDirectory);
  },
  filename: (req, file, callback) => {
    const fileExt = extname(file.originalname);

    const userId = (req as any)?.id ?? 'unauth';
    const id = uuidv4().replace(/-/, '');

    const fName = `${userId}-${Date.now()}-${id}${fileExt}`;

    callback(null, fName);
  },
});

export const cvsUploadFilter: fileFilter = (_req, file, cb) => {
  if (file.mimetype.endsWith('csv')) {
    cb(null, true);
  } else {
    cb(new BadRequestException(['Only CSV are allowed.']), false);
  }
};

// Type hint
type fileFilter = (
  req: any,
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  },
  cb: (error: Error | null, acceptFile: boolean) => void,
) => void;
