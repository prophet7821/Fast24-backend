import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as mongooseSchema } from "mongoose";
import { Car } from "../cars/cars.schema";
import { User } from "../users/users.schema";

export type PaymentsDocument = HydratedDocument<Payment>;

@Schema({ collection: "payments" })
export class Payment {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: "Car", required: true })
  car: Car;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: "User", required: true })
  user: User;

  @Prop({ type: String, required: true })
  paymentIntent: string;

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: "Payment",
    required: false,
  })
  previousPayment: Payment;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
