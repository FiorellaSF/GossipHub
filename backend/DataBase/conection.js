import mongoose from "mongoose"

 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI
       
      // , {useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,}
    );
    console.log('Conectado');
  } catch (error) {
    console.error('Error al conectar:', error.message);
    process.exit(1); 
  }
};

export default connectDB;