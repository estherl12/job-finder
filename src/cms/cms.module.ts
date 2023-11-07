import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CmsController } from './cms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cms } from './entities/cm.entity';
import { EndusersModule } from 'src/endusers/endusers.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cms]),EndusersModule],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
