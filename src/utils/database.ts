import mongoose from 'mongoose';

export const connectToDatabase = async (uri: string) => {
  try {
    //mongoose connection
    await mongoose
      .connect(uri)
      .then(() => console.log('connected to MongoDB'))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error('Error connecting to database: ', err);
    throw err;
  }
};
