import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([

      {
        // aca tiene que tener la misma conexion que en productos para la forma en la que van a hablar los dos  en el main del otro proyecto lo encontras con el nombre COX1 en la parte de envs.ts tambien hay de esto pero es la configuracion de envs
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.port

        }



      },

    ]),
  ]
})
export class ProductsModule { }
