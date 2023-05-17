import { PaymentCreatedEvent, Publisher, Subjects } from "@marksdev-ticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
}