import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('Mongodb uri', process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Mongodb error', err);
    process.exit(1);
  }
};
