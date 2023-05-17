import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
} from "@marksdev-ticket/common";
import { Ticket } from "../../models/ticket";
import { queuGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queuGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    console.log('Ticket before update', ticket)

    const { title, price} = data;
    ticket.set({
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
