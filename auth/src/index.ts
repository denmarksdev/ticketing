import mongoose from "mongoose";
import { app } from "./app";

const Port = 3000;

const start = async () => {
  console.log('Starting up ...')

  if (! process.env.JWT_KEY){
    throw Error('JWT_KEY must be defined')
  } 
  if (! process.env.MONGO_URI){
    throw Error('MONGO_URI must be defined')
  } 

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db");
  } catch (error) {
    console.error(error);
  }

  app.listen(Port, () => {
    console.log(`Auth running on port ${Port}!`);
  });
};

start();
