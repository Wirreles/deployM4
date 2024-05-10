import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream'
import { Repository } from 'typeorm';
import Products from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
  
  constructor(@InjectRepository(Products) private productsRepository: Repository<Products>){}

  async updateImage(id: string,file: Express.Multer.File): Promise<UploadApiResponse> {
      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {resource_type: 'auto'},
          async (error, result) => {
            if(error){
              reject(error);
            } else {
              resolve(result);
              await this.productsRepository.update(id, {imgUrl: result.secure_url});
            }
  
          },
        );
        toStream(file.buffer).pipe(upload);
      });    
  }
}