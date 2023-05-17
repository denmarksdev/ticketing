import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
  } from "@marksdev-ticket/common";
  
  export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
  }
  