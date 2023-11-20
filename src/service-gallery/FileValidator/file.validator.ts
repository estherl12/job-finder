import { FileValidator } from "@nestjs/common"
import path, { extname } from "path"
import fs from 'fs';
import dayjs from 'dayjs';
import { diskStorage } from "multer";
import {v4 as uuidv4} from 'uuid';

export const pngFileFilter = (req,file,callback) => {
    let ext = path.extname(file.originalname)

    if(ext != '.png'){
        return callback(new Error('Invalid file type'), false)
    }
    return callback(null,true)
}

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
      const response =  file.mimetype  //file.buffer contains the details about the file and its mime type
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

    
  export const multerDiskStorage = diskStorage({
    destination:(req, file, callback) =>{
      const folderName = dayjs().format('YYYY-MM')
      const fullDirectory = `./files/${folderName}`

      if(!fs.existsSync(fullDirectory)){
        fs.mkdirSync(fullDirectory,{recursive:true});
      }
      return callback(null,fullDirectory)
    },
    //obj with key and function
    filename:(req,file,callback)=>{
      const fileExt = extname(file.originalname)
      const userId = (req as any)?.userId??'unauth';
      //replace all - with '' globally not only first
      const id = uuidv4().replace(/-/g,'');
      const fName = `${userId}-${Date.now()}-${id}${fileExt}`;
      console.log(fName)
       callback(null,fName);
    }
    
  });

  