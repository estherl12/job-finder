import { PartialType } from '@nestjs/swagger';
import { CreateCareercategoryDto } from './create-careercategory.dto';

export class UpdateCareercategoryDto extends PartialType(CreateCareercategoryDto) {}
