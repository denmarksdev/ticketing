import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@marksdev-ticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
