import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@marksdev-ticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
