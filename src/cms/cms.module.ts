import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CmsController } from './cms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cms } from './entities/cm.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cms])],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
