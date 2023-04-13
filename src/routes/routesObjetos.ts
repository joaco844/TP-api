import express, { Router } from 'express';
import { Objetos } from '../Objetos';
import { Casa } from '../Casa';
import { objetos } from '..';

export const routerObjeto = Router();

routerObjeto.get("/objetos", (_req,_res) => {
    _res.json(objetos);
  })

  routerObjeto.get("/objetos/:id", (_req,_res) => {
    _res.json(objetos.find(item => {
                  return item.id == Number(_req.params.id)
              }));
  
  })

  routerObjeto.post("/objetos", (_req,_res) => {
    const unObjetos = new Objetos(String(_req.body.nombre),Number(_req.body.consumo), Number(_req.body.id), );
    objetos.push(unObjetos);
    _res.json(unObjetos);   
  })

  routerObjeto.delete("/objetos/:id", (_req,_res) => {
    const p = objetos.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (p){
      delete objetos[objetos.indexOf(p)]
    }
    _res.status(204).send()
  })

  routerObjeto.put("/objetos/:id", (_req,_res) => {
    const p = objetos.find(item => {
                  return item.id == Number(_req.params.id)
              }) 
              if (!p){
                _res.send(404)
                return    
            }
              if(_req.body.nombre==undefined || _req.body.id==undefined || _req.body.consumo==undefined){
                _res.send(404)
                return    
            } else{
              p.consumo = _req.body.consumo
              p.nombre = _req.body.nombre
              p.id = _req.body.id
            }
      _res.json(p);   
      _res.json(200);
  })

  routerObjeto.patch("/objetos/:id/", (_req,_res) => {
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