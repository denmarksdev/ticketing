import { Listener, Subjects, TicketUpdatedEvent } from "@marksdev-ticket/common";
import { Message } from "node-nats-streaming";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = 'payments-service';
    
    onMessage(data: { id: string; title: string; price: number; userId: string; }, msg: Message): void {
        console.log ('Event data!', data);
        msg.ack();
    }
}