import express, { Router } from 'express';
import Objetos, { ObjetoDocument } from '../Objetos';
import db from '../db';

export const routerObjeto = Router();

routerObjeto.get("/objetos", async (_req,_res) => {
  const obj = await Objetos.find();
  _res.send(obj);
  })

  routerObjeto.get("/objetos/:id", async (_req,_res) => {
    const obj = await Objetos.find({"id": _req.params.id});
    _res.send(obj);
    })

    routerObjeto.post("/objetos", async (_req,_res) => {
      const obj = new Objetos(_req.body);
      await obj.save();
      _res.send(obj); 
      })

  routerObjeto.delete("/objetos/:id", async (_req,_res) => {
    const obj = await Objetos.deleteOne({"id": _req.params.id});
    _res.status(200).send(obj)
      
  })
  routerObjeto.put("/objetos/:id", async (_req,_res) => {
    const id = _req.params.id;
    const obj = await Objetos.findOneAndReplace({"id": _req.params.id}, _req.body);
    _res.send(obj);
      
  })
  routerObjeto.patch("/objetos/:id", async (_req,_res) => {
    const asd = await Objetos.findOneAndReplace({"id": _req.params.id}, _req.body)
    _res.status(200).send(asd) 
      
  })