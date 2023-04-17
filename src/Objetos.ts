import mongoose from 'mongoose';

export class Objetos {
    nombre: string; 
    id: number;
    consumo: number;
    constructor(nombre:string, consumo:number, id: number){
        this.nombre = nombre;
        this.id = id;
        this.consumo = consumo;
    }

}

export interface ObjetosType extends mongoose.Document {
  id: Number;
  consumo: Number;
  nombre: String;

}

const objetosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  id: { type: Number, required: true },
  consumo: { type: String, required: true },
});

export default mongoose.model<ObjetosType>('Objetos', objetosSchema);
