import { Controller } from '@nestjs/common';
import { AbcdService } from './abcd.service';

@Controller('abcd')
export class AbcdController {
  constructor(private readonly abcdService: AbcdService) {}
}
