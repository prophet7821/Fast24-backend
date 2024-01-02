import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { NotificationProcessor } from "../consumers/notification.processor";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "notifications",
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationProcessor],
})
export class NotificationsModule {}
