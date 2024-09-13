//payments.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Payment } from "./payments.schema";
import { InjectStripe } from "../stripe/decorators/injectStripe.decorator";
import { User } from "../users/users.schema";
import { CarsService } from "../cars/cars.service";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    private readonly carService: CarsService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async retrievePaymentIntent(paymentIntentId: string) {
    try {
      return await this.stripeClient.paymentIntents.retrieve(paymentIntentId);
    } catch (e) {
      throw new NotFoundException("Payment Intent not found");
    }
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    idempotencyKey: string,
    user: User,
    carId: string
  ) {
    try {
      await this.carService.getCarById(carId);
      const paymentIntent = await this.stripeClient.paymentIntents.create(
        {
          amount,
          currency,
        },
        {
          idempotencyKey,
        }
      );

      this.eventEmitter.emit("payment_intent.created", {
        car: carId,
        user: user["_id"],
        paymentIntent: paymentIntent.id,
        status: paymentIntent.status,
        message: "Payment Intent Created",
      });

      return paymentIntent;
    } catch (e) {
      throw e;
    }
  }

  @OnEvent("payment.*")
  async createPaymentLog(payload: {
    car: string;
    user: User;
    paymentIntentId: string;
    status: string;
    message: string;
  }) {
    const { car, user, paymentIntentId, status, message } = payload;
    const latestLog = await this.paymentModel
      .findOne({ paymentIntent: paymentIntentId })
      .sort({ updatedAt: -1 })
      .exec();
    const paymentIntent = await this.stripeClient.paymentIntents.retrieve(
      paymentIntentId
    );
    const payment = new this.paymentModel({
      car: new mongoose.Types.ObjectId(car),
      user: user["_id"],
      paymentIntent: paymentIntent.id,
      paymentMethod: String(paymentIntent.payment_method),
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: status,
      createdAt: new Date(paymentIntent.created * 1000),
      updatedAt: Date.now(),
      message: message,
      previousPayment: latestLog ? latestLog["_id"] : null,
    });

    await payment.save();
  }

  handleWebhookEvent(rawBody: Buffer, signature: string) {
    const event = this.stripeClient.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(event);
  }
}
