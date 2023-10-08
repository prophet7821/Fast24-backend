import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue("notifications") private notificationsQueue: Queue
  ) {}

  async sendNotification() {
    return await this.notificationsQueue.add("email", {
      message: "Hello world!",
    });
  }
}
