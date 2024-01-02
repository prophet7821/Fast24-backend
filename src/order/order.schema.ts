// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { HydratedDocument, Schema as mongooseSchema } from "mongoose";
// import { Car } from "../cars/cars.schema";
// import { User } from "../users/users.schema";
//
// export type OrdersDocument = HydratedDocument<Order>;
//
// @Schema({ collection: "order" })
// export class Order {
//   @Prop({ type: mongooseSchema.Types.ObjectId, ref: "Car", required: true })
//   car: Car;
//
//   @Prop({ type: mongooseSchema.Types.ObjectId, ref: "User", required: true })
//   user: User;
//
//   @Prop({ type: String, required: true })
//   paymentIntent: string;
//
//   @Prop({ type: String, required: true })
//   paymentMethod: string;
//
//   @Prop({ type: Number, required: true })
//   amount: number;
//
//   @Prop({ type: String, required: true })
//   currency: string;
//
//   @Prop({ type: Date, default: Date.now() })
//   createdOn: Date;
//
//   @Prop({ type: Date })
//   deliveredOn: Date;
// }
//
// export const OrderSchema = SchemaFactory.createForClass(Order);
