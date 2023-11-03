import { PartialType } from '@nestjs/swagger';
import { CreateCareervacancyDto } from './create-careervacancy.dto';

export class UpdateCareervacancyDto extends PartialType(CreateCareervacancyDto) {}
