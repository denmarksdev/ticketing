import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@marksdev-ticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
