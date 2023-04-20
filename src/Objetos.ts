import mongoose from 'mongoose';

export interface ObjetoDocument extends Document {
  nombre: string;
  id: Number;
  consumo: Number;
}
const objetosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  id: { type: Number, required: true },
  consumo: { type: Number, required: true },
});

export default mongoose.model('Objetos', objetosSchema);
