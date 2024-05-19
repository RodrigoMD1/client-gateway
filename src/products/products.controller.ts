/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {


  constructor() { }

  @Post()
  createProduct() {
    return 'crea un producto'
  }


  @Get()
  findAllProducts() {
    return 'esta funcion devuelva varios productos '
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'esta funcion regresa el producto ' + id;
  }

  @Get(':id')
  deleteProduct(@Param('id') id: string) {
    return 'esta funcion elimina el producto ' + id;
  }


  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    @Body() body: any) {
    return 'esta funcion actualiza el producto' + id;
  }

}
