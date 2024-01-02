import { Controller, Get } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller({
  path: "notifications",
  version: "1",
})
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get("send")
  async getNotifications() {
    return await this.notificationService.sendNotification();
  }
}
