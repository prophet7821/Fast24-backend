//payments.module.ts
import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "./payments.schema";
import { StripeModule } from "nestjs-stripe";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    StripeModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
