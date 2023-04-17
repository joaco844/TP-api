import { Objetos } from "./Objetos";
import mongoose from 'mongoose';

export class Casa  {
    direccion: Number;
    consumo_diario: Number;
    objetos:Array<Objetos> = new Array<Objetos>;
  save: any;
     constructor(direccion: Number, consumo: Number){
       
         this.direccion = direccion;
         this.consumo_diario = consumo;
         this.objetos = new Array<Objetos>;
     }
    }
 export interface CasaType extends mongoose.Document  {
    direccion: Number;
    consumo_diario: Number;
    objetos: Array<Objetos>;
  }
  
  const casaSchema = new mongoose.Schema({
    nombre: { type: Number, required: true },
    direccion: { type: Number, required: true },
    objetos: [{ type: Array<Objetos>, ref: 'Objetos' }],
  });
  
  export default mongoose.model<CasaType>('Casa', casaSchema);
