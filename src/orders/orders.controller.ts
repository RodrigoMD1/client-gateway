/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';



@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);

  }

  @Get()
  findAll(@Query() orderpaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderpaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {

      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id })
      );
      return order;

    } catch (error) {
      throw new RpcException(error);
    }
  }



  @Get(':status')
  async findOneByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.ordersClient.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }




  @Patch(':id')
  //Aca puedo poner los guards para la autorizacion o autenticacion para que los que tengan permiso puedan cambiar el estado de pendiente a cancelado o aprobado etc o guards globales poner
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {
      return this.ordersClient.send('changeOrderStatus', { id, status: statusDto.status })
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
