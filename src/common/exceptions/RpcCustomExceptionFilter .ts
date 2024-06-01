/* eslint-disable @typescript-eslint/no-unused-vars */

import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {

        console.log('paso por aqui el nuestro custom filter ');


        throw new UnauthorizedException('holasss');
    }
}