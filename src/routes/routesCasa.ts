import express, { Router } from 'express';
import { ObjetoDocument } from '../Objetos';
import  Casa, { CasaType } from '../Casa';
//import { casas } from '..';
import mongoose, { ConnectOptions, Error } from "mongoose";

export const routerCasa = Router();
export const routerMetodos = Router();

routerCasa.get("/casas", async (_req,_res) => {
  const casas = await Casa.find().populate('objetos');
  _res.send(casas);
  })

routerCasa.get("/casas/:direccion", async (_req,_res) => {
  const casas = await Casa.find({"direccion": _req.params.direccion});
  _res.send(casas);
  })

routerCasa.post("/casas", async (_req,_res) => {
  const casa = new Casa(_req.body);
  await casa.save();
  _res.send(casa); 
  })

  routerCasa.delete("/casas/:direccion", async (_req,_res) => {
    const casas = await Casa.deleteOne({"direccion": _req.params.direccion});
    _res.status(200).send(casas)
  })

  routerCasa.put("/casas/:direccion", async(_req,_res) => {
    const direccion = _req.params.direccion;
    const casa = await Casa.findOneAndReplace({"direccion": _req.params.direccion}, _req.body);
    _res.send(casa);
  })

  routerCasa.patch("/casas/:direccion", async(_req,_res) => {
    const casa = await Casa.findOneAndUpdate({"direccion": _req.params.direccion}, _req.body);
    _res.send(casa)
  })

  //------------Metodos personalizados------------------------------------------------

  routerMetodos.get("/casas/:direccion/mostrarConsumo", (_req,_res) => {
    Casa.find().then((casas)=>{
      casas.forEach(element => {
          _res.send(String(element.consumo_diario));
    });
      });
  })


  routerMetodos.get("/casas/sumar_consumos/:direccion/:direccion1", async (_req, _res) => {
    let suma: Number;
    Casa.find().then((casas1)=>{
      casas1.forEach(element1 => {
        Casa.find().then((casas)=>{
          casas.forEach(element => {
            suma = element.consumo_diario.valueOf() + element1.consumo_diario.valueOf();
            _res.status(200).send(suma)
      });
          })
        });
          });
          
    });
      


    routerMetodos.patch("/casas/editar_direccion/:direccion", async(_req, _res) => {
         const casa = await Casa.findOneAndUpdate({"direccion": _req.params.direccion}, _req.body);
    _res.send(casa)
      })
