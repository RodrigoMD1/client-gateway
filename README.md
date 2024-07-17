## Cliente gateway 
el gateway es el punto de comunicacion entre nuestros clientes y nuestros servicios. Es el encargado de recibir las peticiones,enviarlas a los servicios correspondientes y devolver la respuesta al cliente.

## DEV
1 clonar el repositorio 
installar dependencias 
3 crear un archivo env basado en envs.template,
4 tener levantados los microservicios que se van a consumir
5 levantar proyecto con npm run start:dev

## nats
```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats

```
