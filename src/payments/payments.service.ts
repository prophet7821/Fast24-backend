//payments.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import { Stripe } from "stripe";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Payment } from "./payments.schema";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
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
    idempotencyKey: string
  ) {
    try {
      const paymentIntent = await this.stripeClient.paymentIntents.create(
        {
          amount,
          currency,
          statement_descriptor: "Fast24",
        },
        {
          idempotencyKey,
        }
      );

      // this.createPaymentLog(car, user, paymentIntent.id, "created", "A Payment Intent creation was attempted").catch(e => console.log(e));

      return {
        client_secret: paymentIntent.client_secret,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Error creating Payment Intent");
    }
  }

  // async createPaymentLog(
  //     car: string,
  //     user: User,
  //     paymentIntentId: string,
  //     status: string,
  //     message: string,
  // ) {
  //
  //     const latestLog = await this.paymentModel.findOne({paymentIntent: paymentIntentId})
  //         .sort({updatedAt: -1})
  //         .exec();
  //     const paymentIntent = await this.stripeClient.paymentIntents.retrieve(paymentIntentId);
  //     const payment = new this.paymentModel({
  //         car: new mongoose.Types.ObjectId(car),
  //         user: user["_id"],
  //         paymentIntent: paymentIntent.id,
  //         paymentMethod: String(paymentIntent.payment_method),
  //         amount: paymentIntent.amount,
  //         currency: paymentIntent.currency,
  //         status: status,
  //         createdAt: new Date(paymentIntent.created * 1000),
  //         updatedAt: Date.now(),
  //         message: message,
  //         previousPayment: latestLog ? latestLog["_id"] : null,
  //     });
  //
  //     await payment.save();
  // }
}
