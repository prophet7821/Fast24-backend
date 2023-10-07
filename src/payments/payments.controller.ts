//payments.controller.ts
import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller({
  path: "payments",
  version: "1",
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Body() paymentsData: { amount: number; currency: string }) {
    return this.paymentsService.createPaymentIntent(
      paymentsData.amount,
      paymentsData.currency
    );
  }
}
