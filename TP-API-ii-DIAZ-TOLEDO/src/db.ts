import mongoose, { ConnectOptions } from "mongoose";
const url = 'mongodb://localhost:27017/TP-API-DIAZ-TOLEDO';
mongoose.connect(url,  {
} as ConnectOptions).then(() => {
  console.log('Conexión exitosa con MongoDB');
}).catch((error) => {
  console.log('Error al conectar con MongoDB:', error);
});

export default mongoose.connection;
