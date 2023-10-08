import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "notifications",
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
