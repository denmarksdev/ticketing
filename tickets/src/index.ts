import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";

const Port = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_URL) {
    throw Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER) {
    throw Error("NATS_CLUSTER must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw Error(" NATS_CLIENT_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log(`NATS connection closed! ${process.env.NATS_CLIENT_ID}`);
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db");
  } catch (error) {
    console.error(error);
  }

  app.listen(Port, () => {
    console.log(`Tickets running on port ${Port}!`);
  });
};

start();
