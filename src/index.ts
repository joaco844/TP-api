import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from './swagger';
import { routerObjeto } from './routes/routesObjetos';
import { routerCasa } from './routes/routesCasa';
import { routerMetodos } from './routes/routesCasa';
import { TokenValidation } from "./libs/validateToken";
import router from './auth';
import mongoose, { ConnectOptions } from "mongoose";
const dbUrl = 'mongodb://localhost:27017/TP-API-DIAZ-TOLEDO';

const app: express.Application = express();
const port = 5100;
app.listen(port, ( ) => {console.log("La Api esta funcionando")})

//let o1:Objetos = new Objetos("tv",1234,1);
//let c1:Casa = new Casa(1, 123123);

mongoose.connect(dbUrl,  {
} as ConnectOptions).then(() => {
  console.log('Conexión exitosa con MongoDB');
}).catch((error) => {
  console.log('Error al conectar con MongoDB:', error);
});


//export let casas:Array<Casa> = new Array<Casa>;
//export let objetos:Array<Objetos> = new Array<Objetos>;
//casas.push(c1);
//objetos.push(o1); 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyParser.json())
app.get('/', (_req , _res) => _res.send('Bienvenido a mi API REST!'));


  //-------------------------------------------------

  app.use(router);

  //-------------------------------------------------
  
  app.get("/objetos", TokenValidation,routerObjeto)
 
  app.get("/objetos/:id", TokenValidation,routerObjeto)
  
  app.post("/objetos", TokenValidation,routerObjeto)
  
  app.delete("/objetos/:id", TokenValidation,routerObjeto)

  app.put("/objetos/:id", TokenValidation,routerObjeto)

  app.patch("/objetos/:id/", TokenValidation,routerObjeto)

  //-------------------------------------------------

  app.get("/casas",TokenValidation, routerCasa)

  app.get("/casas/:direccion", TokenValidation,routerCasa)
  
  app.post("/casas", TokenValidation,routerCasa)
  
  app.delete("/casas/:direccion",TokenValidation, routerCasa)

  app.put("/casas/:direccion", TokenValidation,routerCasa)

  app.patch("/casas/:direccion",TokenValidation, routerCasa)

  app.get("/casas/:direccion/mostrarConsumo",TokenValidation, routerMetodos)

  app.patch("/casas/sumar_consumos/:direccion/:direccion1",TokenValidation, routerMetodos)

  app.patch("/casas/editar_direccion/:direccion", TokenValidation,routerMetodos)
