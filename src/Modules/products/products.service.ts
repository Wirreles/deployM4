import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Products from '../../entities/products.entity';
import { Repository } from 'typeorm';
import Categories from 'src/entities/categories.entity';
import { ProductsDto } from 'src/dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const product: Products[] = await this.productRepository.find({
      relations: { category: true },
    });
    if (product.length === 0) {
      throw new NotFoundException('No hay Productos');
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    const productList: Products[] = product.slice(start, end);
    const productStock: Products[] = productList.filter(
      (product) => product.stock !== 0,
    );
    if (productStock.length === 0) {
      throw new NotFoundException('No hay stock de ningun Producto');
    }
    return productStock;
  }
  async getProductById(id: string): Promise<Products> {
    return await this.productRepository.findOneBy({ id });
  }

  async updateProduct(id: string, product: Partial<Products>): Promise<Object> {
    const producto: Products = await this.productRepository.findOneBy({ id });
    if (!producto)
      throw new BadRequestException('El id del Producto es incorrecto');
    await this.productRepository.update(id, product);
    return { message: 'El producto fue actualizado con Exito!' };
  }

  async deleteProduct(id: string): Promise<object> {
    const product: Products = await this.productRepository.findOneBy({ id });
    if (!product) throw new BadRequestException('No existe el Producto');
    await this.productRepository.delete({ id });
    return { message: 'Producto Eliminado Exitosamente' };
  }

  async createProduct(product: ProductsDto): Promise<Object> {
    const producto = await this.productRepository.findOneBy({
      name: product.name,
    });
    if (producto) {
      producto.stock = producto.stock + 1;
      return { message: 'El Producto ya existe por ende fue sumado al stock' };
    }
    const category: Categories = await this.categoriesRepository.findOneBy({
      name: product.category.name,
    });
    if (!category)
      throw new BadRequestException('La categoria elegida es incorrecta');
    product.category = category;
    await this.productRepository.save(product);
    return { message: 'El producto se actualizo correctamente' };
  }
}
