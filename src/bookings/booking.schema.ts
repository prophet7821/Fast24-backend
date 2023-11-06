// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { HydratedDocument, Schema as mongooseSchema } from "mongoose";
// import { Car } from "../cars/cars.schema";
// import { User } from "../users/users.schema";
//
// export type BookingDocument = HydratedDocument<Booking>;
// @Schema({ collection: "bookings" })
// export class Booking {
//   @Prop({ type: mongooseSchema.Types.ObjectId, ref: "Car", required: true })
//   car: Car;
//
//   @Prop({ type: mongooseSchema.Types.ObjectId, ref: "User", required: true })
//   user: User;
//
//   @Prop({ default: Date.now, required: true })
//   transactionStartDate: Date;
//
//   @Prop({ type: Date })
//   transactionEndDate: Date;
//
//   @Prop({ required: true })
//   transactionAmount: number;
//
//   @Prop({ required: true })
//   transactionType: string;
//
//   @Prop({ default: "pending" })
//   transactionStatus: string;
//
//   @Prop({ required: true })
//   transactionId: string;
//
//   @Prop({ required: true })
//   transactionToken: string;
// }
//
// export const BookingSchema = SchemaFactory.createForClass(Booking);
