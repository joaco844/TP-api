import express from 'express';
import bodyParser from 'body-parser';
import { ObjetoDocument } from './Objetos';
import { CasaType } from './Casa';
import swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from './swagger';
import { routerObjeto } from './routes/routesObjetos';
import { routerCasa } from './routes/routesCasa';
import mongoose, { ConnectOptions } from "mongoose";
import db from './db';
const dbUrl = 'mongodb://localhost:27017/TP-API-DIAZ-TOLEDO';

const app: express.Application = express();
const port = 5002;
app.listen(port, () => {console.log("La Api esta funcionando")})
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
  
  app.get("/objetos", routerObjeto)
 
  app.get("/objetos/:id", routerObjeto)
  
  app.post("/objetos", routerObjeto)
  
  app.delete("/objetos/:id", routerObjeto)

  app.put("/objetos/:id", routerObjeto)

  app.patch("/objetos/:id/", routerObjeto)

  //-------------------------------------------------

  app.get("/casas", routerCasa)

  app.get("/casas/:direccion", routerCasa)
  
  app.post("/casas", routerCasa)
  
  app.delete("/casas/:direccion", routerCasa)

  app.put("/casas/:direccion", routerCasa)

  app.patch("/casas/:direccion", routerCasa)

  app.get("/casas/:direccion/mostrarConsumo", routerCasa)

  app.patch("/casas/:direccion/editar consumo", routerCasa)

  app.patch("/casas/:direccion/editar direccion", routerCasa)
