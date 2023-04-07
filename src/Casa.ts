import { Objetos } from "./Objetos";
export class Casa {
    direccion: number;
    consumo_diario: Number;
    objetos:Array<Objetos> = new Array<Objetos>;
     constructor(direccion: number, consumo: Number){
         this.direccion =direccion;
         this.consumo_diario = consumo;
         this.objetos = new Array<Objetos>;
     }
 }