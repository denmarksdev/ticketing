import nast, { Stan } from "node-nats-streaming";
import { getRandomValues} from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
import { TicketUpdatedListener } from "./events/ticket-updated-listener";

console.clear();

const client = nast.connect("ticketing", 'aff', {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("NATS Connected!");
  new TicketCreatedListener(client).listen();
  new TicketUpdatedListener(client).listen();
});

client.on("close", () => {
  console.log("NATS connection closed!");
  process.exit();
});
process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
