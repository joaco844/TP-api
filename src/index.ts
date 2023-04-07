import express from 'express';
import { Objetos } from './Objetos';
import { Casa } from './Casa';
import swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from './swagger';
const app: express.Application = express();
const port = 3000;

let o1:Objetos = new Objetos("tv",1234,1);
let c1:Casa = new Casa(1, 123123);

let casas:Array<Casa> = new Array<Casa>;
let objetos:Array<Objetos> = new Array<Objetos>;
casas.push(c1);
objetos.push(o1); 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (_req , _res) => _res.send('Bienvenido a mi API REST!'));


  app.get("/objetos", (_req,_res) => {
    _res.json(objetos);
  })
  //-------------------------------------------------
  app.get("/casas", (_req,_res) => {
    _res.json(casas);
  })
  app.get("/objetos/:id", (_req,_res) => {
    _res.json(objetos.find(item => {
                  return item.id == Number(_req.params.id)
              }));
  
  })
  
  app.post("/objetos", (_req,_res) => {
    const unObjetos = new Objetos(_req.body.consumo, _req.body.id, _req.body.nombre);
    objetos.push(unObjetos);
    _res.json(unObjetos);   

  })
  
  app.delete("/objetos/:id", (_req,_res) => {
    const p = objetos.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (p){
      delete objetos[objetos.indexOf(p)]
    }
    _res.status(204).send()
  })

  app.put("/objetos/:id", (_req,_res) => {
    const p = objetos.find(item => {
                  return item.id == Number(_req.params.id)
              })
    if (p){
      p.id = _req.body.id
      p.consumo = _req.body.consumo;
      p.nombre = _req.body.nombre;
    }
    _res.json(p);   
  })

  app.patch("/objetos/:id/", (_req,_res) => {
    const p = objetos.find(item => {
                  return item.id == Number(_req.params.id)
              })
    if (p){
        if(_req.body.id){
            p.id = _req.body.id;
        }
        if(_req.body.consumo){
            p.consumo = _req.body.consumo;  
    }
        if(_req.body.nombre){
            p.nombre = _req.body.nombre;
        }
    _res.json(p);   
  }})

  //-------------------------------------------------
  app.get("/casas/:direccion", (_req,_res) => {
    _res.json(casas.find(item => {
                  return item.direccion == Number(_req.params.direccion)
              }));
  
  })
  
  app.post("/casas", (_req,_res) => {
    const unaCasa = new Casa(_req.body.direccion, _req.body.consumo_diario);
    casas.push(unaCasa);
    _res.json(unaCasa);   

  })
  
  app.delete("/casas/:direccion", (_req,_res) => {
    const p = casas.find(item => {
        return item.direccion == Number(_req.params.direccion)
    })
    if (p){
      delete casas[casas.indexOf(p)]
    }
    _res.status(204).send()
  })

  app.put("/casas/:direccion", (_req,_res) => {
    const p = casas.find(item => {
                  return item.direccion == Number(_req.params.direccion)
              })
    if (p){
      p.direccion = _req.body.direccion
      p.consumo_diario = _req.body.consumo_diario;
      p.objetos = _req.body.objetos;
    }
    _res.json(p);   
  })

  app.patch("/casas/:direccion", (_req,_res) => {
    const p = casas.find(item => {
                  return item.direccion == Number(_req.params.direccion)
              })
    if (p){
        if(_req.body.direccion){
            p.direccion = _req.body.direccion;
        }
        if(_req.body.objetos){
            p.objetos = _req.body.objetos;  
    }
        if(_req.body.consumo_diario){
            p.consumo_diario = _req.body.consumo_diario;
        }
    _res.json(p);   
  }})

  app.get("/casas/:direccion/mostrarConsumo", (_req,_res) => {
    const p = casas.find(item => {
      _res.status(204).send()
      return item.direccion == Number(_req.params.direccion)
      
  })
  if(p){
      console.log("su consumo diario es: ", p.consumo_diario);
  }
  })

  app.patch("/casas/:direccion/editar consumo", (_req, _res) => {
    const p = casas.find(item => {
                  return item.direccion == Number(_req.params.direccion)
              })
            if(p){
              if(_req.body.consumo_diario){
                p.consumo_diario = _req.body.consumo_diario;
              }
            }
            })
  app.patch("/casas/:direccion/editar direccion", (_req, _res) => {
      const p = casas.find(item => {
            return item.direccion == Number(_req.params.direccion)
         })
         if (p){
          if(_req.body.direccion){
              p.direccion = _req.body.direccion;
          }
          if(_req.body.consumo_diario){
              p.consumo_diario = 0;
          }
      _res.json(p);   
    }})
//----------------------------------------------------------

  
  app.listen( port );