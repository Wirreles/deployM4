import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.services';
import { CloudinaryConfig } from 'src/config/cloudinary';
import Products from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/Modules/products/products.service';
import Categories from 'src/entities/categories.entity';
import { CategoriesService } from 'src/Modules/categories/categories.service';

@Module({
  imports:[TypeOrmModule.forFeature([Products,Categories])],

  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig, ProductsService, CategoriesService]
})
export class FilesModule {}