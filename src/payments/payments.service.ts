//payments.service.ts
import { Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import { Stripe } from "stripe";

@Injectable()
export class PaymentsService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripeClient.paymentIntents.create({
      amount,
      currency,
    });
  }
}
