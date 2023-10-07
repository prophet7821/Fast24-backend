//payments.module.ts
import { Module } from "@nestjs/common";
import { StripeModule } from "nestjs-stripe";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey:
        "sk_test_51LJhJ7SCfwlvAQMZaioJ40JmkN9B8pqrDWsytu1deRFfeWZoQ6dCPE0bgaTM9i8a6DkExdupHAsAsPTg06Rj1WyO00s9iQt6FR",
      apiVersion: "2023-08-16",
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
