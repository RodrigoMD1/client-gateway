import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number; // este tiene que tener el mismo port que el otro proyecto 
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
  PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  ORDERS_MICROSERVICE_HOST: joi.string().required(),
  ORDERS_MICROSERVICE_PORT: joi.number().required()

})
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);


if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;


export const envs = {
  port: envVars.PORT,
  productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,


  ordersMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
  ordersMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,

};

////////////////////////////////////
// lo que es lo de arriba se pude hacer un snipet y llamarlo cada vez que se tenga que usar ya que rara vez cambia esta config