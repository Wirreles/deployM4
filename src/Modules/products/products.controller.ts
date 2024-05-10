import { AuthGuard } from 'src/guards/AuthGuard';
import { ProductsService } from './products.service';
import { Controller, Get, Post, Put,Delete, Param, HttpCode, Body, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guards';
import { Role } from '../../roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsDto } from 'src/dto/products.dto';
// import ProductsDTO from '../../dto/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @HttpCode(200)
    @Get()
    getProduct(@Query ("limit") limit: string="5", @Query ("page") page:string="1") {
      return this.productsService.getProducts(Number(page),Number(limit));
    }
    
    @HttpCode(200)
    @Get(":id")
    getProductById(@Param ("id", ParseUUIDPipe) id: string) {
      return this.productsService.getProductById(id);
    }

    @HttpCode(201)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    createProduct(@Body () product: ProductsDto) {
      return this.productsService.createProduct(product);
    }
    
    @ApiBearerAuth()
    @HttpCode(200)
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param ("id", ParseUUIDPipe) id:string, @Body() product: ProductsDto) {
      return this.productsService.updateProduct(id, product);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(":id")
    deleteProduct(@Param ("id", ParseUUIDPipe) id:string ) {
      return this.productsService.deleteProduct(id);
    }
}

