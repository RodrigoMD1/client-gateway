/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/index';

@Controller('products')
export class ProductsController {


  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy // esto me permite usar los controller y la logica del products del otro proyecto
  ) { }

  @Post()
  createProduct() {
    return 'crea un producto'
  }


  @Get()
  findAllProducts() {
    return this.productsClient.send({ cmd: 'find_all_products' },{}) // el segundo argumento ese {} vacio seria el payload del otro proyecto pero aca se envia un objeto vacio
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
