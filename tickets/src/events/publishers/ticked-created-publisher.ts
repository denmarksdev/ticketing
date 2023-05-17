import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@marksdev-ticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
