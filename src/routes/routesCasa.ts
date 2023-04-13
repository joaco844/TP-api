import express, { Router } from 'express';
import { Objetos } from '../Objetos';
import { Casa } from '../Casa';
import { casas } from '..';

export const routerCasa = Router();

routerCasa.get("/casas", (_req,_res) => {
    _res.json(casas);
  })

routerCasa.get("/casas/:direccion", (_req,_res) => {
    _res.json(casas.find(item => {
                  return item.direccion == Number(_req.params.direccion)
              }));
  
  })

routerCasa.post("/casas", (_req,_res) => {
    const unaCasa = new Casa(Number(_req.body.direccion), Number(_req.body.consumo_diario))
    casas.push(unaCasa);
    _res.json(unaCasa);   
  })

  routerCasa.delete("/casas/:direccion", (_req,_res) => {
    const p = casas.find(item => {
        return item.direccion == Number(_req.params.direccion)
    })
    if (p){
      delete casas[casas.indexOf(p)]
    }
    _res.status(204).send()
  })

  routerCasa.put("/casas/:direccion", (_req,_res) => {
    const a = casas.find(item => {
                  return item.direccion == Number(_req.params.direccion)
    })
            if (!a){
                _res.send("no encontro nadaa ")
                return    
            }
            if(_req.body.consumo_diario==undefined ){
                _res.send("encotro un undefined")
                return    
            }
            else{
                a.direccion = _req.body.direccion
                a.consumo_diario = _req.body.consumo_diario
                
            }
            _res.json(a); 
            _res.send(200);
  })

  routerCasa.patch("/casas/:direccion", (_req,_res) => {
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

  //------------Metodos personalizados------------------------------------------------

  routerCasa.get("/casas/:direccion/mostrarConsumo", (_req,_res) => {
    const p = casas.find(item => {
      return item.direccion == Number(_req.params.direccion)
      
  })
  if(p){
      _res.send("su consumo diario es: " + p.consumo_diario);
  }
  })

  routerCasa.patch("/casas/:direccion/editar consumo", (_req, _res) => {
    const p = casas.find(item => {
                  return item.direccion == Number(_req.params.direccion)
              })
            if(p){
              if(_req.body.consumo_diario){
                p.consumo_diario = _req.body.consumo_diario;
               
              }
              _res.send("consumo diario exitosamente modificado: " + p.consumo_diario);
            }

            })

    routerCasa.patch("/casas/:direccion/editar direccion", (_req, _res) => {
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