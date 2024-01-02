//payments.controller.ts
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Headers,
  ParseIntPipe,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../guards/auth.guard";

@Controller({
  path: "payments",
  version: "1",
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("createPaymentIntent")
  @UseGuards(JwtAuthGuard)
  createPayment(
    @Body("amount", ParseIntPipe) amount: number,
    @Body("currency") currency: string,
    @Headers("Idempotency-Key") idempotencyKey: string
  ) {
    return this.paymentsService.createPaymentIntent(
      amount,
      currency,
      idempotencyKey
    );
  }
}
