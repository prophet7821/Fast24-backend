//payments.module.ts
import { Module } from "@nestjs/common";
import { StripeModule } from "nestjs-stripe";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get("STRIPE_SECRET"),
        apiVersion: configService.get("STRIPE_API_VERSION"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
