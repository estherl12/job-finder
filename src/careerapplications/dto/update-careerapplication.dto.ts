import { PartialType } from '@nestjs/swagger';
import { CreateCareerapplicationDto } from './create-careerapplication.dto';

export class UpdateCareerapplicationDto extends PartialType(CreateCareerapplicationDto) {}
