//payments.controller.ts
import {
  Body,
  Controller,
  Headers,
  ParseIntPipe,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../guards/auth.guard";
import { InjectStripe } from "../stripe/decorators/injectStripe.decorator";
import { User as UserDecorator } from "../decorator/user.decorator";
import { Stripe } from "stripe";
import { User } from "../users/users.schema";

@Controller({
  path: "payments",
  version: "1",
})
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  @Post("createPaymentIntent")
  @UseGuards(JwtAuthGuard)
  createPaymentIntent(
    @Body("amount", ParseIntPipe) amount: number,
    @Body("currency") currency: string,
    @Body("carId") carId: string,
    @UserDecorator() user: User,
    @Headers("Idempotency-Key") idempotencyKey: string
  ) {
    return this.paymentsService.createPaymentIntent(
      amount,
      currency,
      idempotencyKey,
      user,
      carId
    );
  }

  @Post("webhook")
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers("stripe-signature") signature: string
  ) {
    this.paymentsService.handleWebhookEvent(req.rawBody, signature);
  }
}
