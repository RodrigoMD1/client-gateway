/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
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
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto) // el segundo argumento ese {} vacio seria el payload del otro proyecto pero aca se envia un objeto vacio
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {

      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id })
      );
      return product;

    } catch (error) {

      throw new RpcException(error);

    }

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
