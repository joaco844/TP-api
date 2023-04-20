import mongoose from 'mongoose';

export interface CasaType extends mongoose.Document {
  direccion: Number;
  consumo_diario: Number;
  objetos: mongoose.Types.ObjectId[];
}

const casaSchema = new mongoose.Schema({
    direccion: { type: Number, required: true },
    consumo_diario: { type: Number, required: true },
  objetos: [{ type: mongoose.Types.ObjectId, ref: 'Objetos' }],
});

export default mongoose.model<CasaType>('Casa', casaSchema);
