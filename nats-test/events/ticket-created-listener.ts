import { Listener, Subjects, TicketCreatedEvent } from "@marksdev-ticket/common";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
    
    onMessage(data: { id: string; title: string; price: number; userId: string; }, msg: Message): void {
        console.log ('Event data!', data);
        msg.ack();
    }
}

