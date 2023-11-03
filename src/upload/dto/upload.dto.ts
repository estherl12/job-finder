
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePdfUploadDto {
  @IsOptional()
  @ApiProperty({ type: 'string', required: false, example: 'cms' })
  readonly category?: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly pdf!: any;
}

export class CreateUploadDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, example: 'cms' })
  category?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image!: Express.Multer.File;
}

export class RemoveUploadDto {
  @IsString({ each: true })
  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['/uploads/image.png'],
  })
  images: string[];
}
