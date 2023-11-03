import { Module } from '@nestjs/common';
import { AbcdService } from './abcd.service';
import { AbcdController } from './abcd.controller';

@Module({
  // import: [],
  controllers: [AbcdController],
  providers: [AbcdService],
})
export class AbcdModule {}
