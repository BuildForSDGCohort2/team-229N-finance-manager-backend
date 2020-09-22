import mongoose from 'mongoose';
import { __prod__ } from '../constants';

export const connectDB = async () => {
  try {
    const uri = __prod__
      ? process.env.MONGO_PROD_URI
      : process.env.MONGO_DEV_URI;
    console.log('Mongodb uri', uri);
    const conn = await mongoose.connect(uri as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
