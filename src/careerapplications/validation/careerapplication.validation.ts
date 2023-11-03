import { FileValidator } from '@nestjs/common';
import { Express } from 'express';
import { fileTypeFromFile } from 'file-type';
import * as fileType from 'file-type-mime';
export interface CustomUploadTypeValidatorOptions {
  fileType: string[];
}
export class CustomFileTypeValidator extends FileValidator {
  private _allowedMimeType: string[];
  constructor(
    protected readonly validationOptions: CustomUploadTypeValidatorOptions,
  ) {
    super(validationOptions);
    this._allowedMimeType = this.validationOptions.fileType;
  }

  async isValid(file?: Express.Multer.File): Promise<boolean> {
    const response = await file.mimetype  //file.buffer contains the details about the file and its mime type
    // const response = fromBuffer(file.buffer);
    return this._allowedMimeType.includes(response);
  }
  buildErrorMessage(): string {
    throw new Error(
      'Upload not allowed . Upload file of type :' +
        `${this._allowedMimeType.join(',')}`,
    );
  }
}

// import { BadRequestException } from '@nestjs/common';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import { extname } from 'path';
// import dayjs from 'dayjs';

// import fs from 'fs';

// export const imageUploadFilter: fileFilter = (_req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new BadRequestException('Only images are allowed!'), false);
//   }
// };

// export const fileUploadFilter: fileFilter = (_req, file, cb) => {
//   const filetypes = /pdf|docx|doc/;
//   const mimetype = filetypes.test(file.mimetype);
//   if (mimetype) {
//     cb(null, true);
//   } else {
//     cb(new BadRequestException('Only files are allowed!'), false);
//   }
// };

// export const multerDiskStorage = diskStorage({
//   destination: (_req, _file, callback) => {
//     const folderName = dayjs().format('YYYY-MM');
//     const fullDirectory = `./uploads/${folderName}`;

//     // node.js create directory if doesn't exists
//     if (!fs.existsSync(fullDirectory)) {
//       fs.mkdirSync(fullDirectory, { recursive: true });
//     }

//     return callback(null, fullDirectory);
//   },
//   filename: (req, file, callback) => {
//     const fileExt = extname(file.originalname);

//     const userId = (req as any)?.id ?? 'unauth';
//     const id = uuidv4().replace(/-/g, '');

//     const fName = `${userId}-${Date.now()}-${id}${fileExt}`;

//     callback(null, fName);
//   },
// });

// // Type hint
// type fileFilter = (
//   req: any,
//   file: {
//     fieldname: string;
//     originalname: string;
//     encoding: string;
//     mimetype: string;
//     size: number;
//     destination: string;
//     filename: string;
//     path: string;
//     buffer: Buffer;
//   },
//   cb: (error: Error | null, acceptFile: boolean) => void,
// ) => void;
