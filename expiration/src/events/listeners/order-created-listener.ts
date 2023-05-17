import { queueGroupName } from "./queue-group-name";
import { Listener, OrderCreatedEvent, Subjects } from "@marksdev-ticket/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queue/expiration-queue";

const secondsToMileseconds = (value: number) => value * 1000;

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting this many milleseconds to process the job:", delay);

    await expirationQueue.add(
      { orderId: data.id },
      {
        delay
      }
    );

    msg.ack();
  }
}
