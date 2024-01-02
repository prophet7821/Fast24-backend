import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("notifications")
export class NotificationProcessor {
  constructor() {}

  @Process("email")
  async sendEmail(job: Job) {
    const { data } = job;
    console.log(job);
  }
}
