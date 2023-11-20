import { Module } from '@nestjs/common';
import { ServiceGalleryService } from './service-gallery.service';
import { ServiceGalleryController } from './service-gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceGallery } from './entities/service-gallery.entity';
import { Service } from 'src/service/entities/service.entity';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports:[TypeOrmModule.forFeature([ServiceGallery,Service]),ServiceModule],
  controllers: [ServiceGalleryController],
  providers: [ServiceGalleryService],
})
export class ServiceGalleryModule {}
