/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config/index';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {


  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy // esto me permite usar los controller y la logica del products del otro proyecto
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto);
  }


  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto) // el segundo argumento ese {} vacio seria el payload del otro proyecto pero aca se envia un objeto vacio
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    return this.productsClient.send({ cmd: 'find_one_product' }, { id })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      );

    // esto de abajo es igual que lo de arriba depende de mi cual elegir el de arriba es mas corte y se entiende mas pero como yo quiera
    //try {
    //  const product = await firstValueFrom(
    //    this.productsClient.send({ cmd: 'find_one_product' }, { id }) );
    // return product;
    //} catch (error) {
    // throw new RpcException(error); }

  }

  @Get(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }


  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductDto) {
    return this.productsClient.send({ cmd: 'update_product' }, {
      id,
      ...updateProductoDto
    }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

}
