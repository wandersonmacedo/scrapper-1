import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

interface ProductDto {
    id: string;
    name: string;
}

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    createProduct(@Body() product: ProductDto) {
        this.productsService.createProduct(product);
    }

}