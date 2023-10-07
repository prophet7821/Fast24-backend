//cars.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CarDocument = HydratedDocument<Car>;
@Schema({ collection: "cars" })
export class Car {
  @Prop({ required: true })
  carImage: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  modelType: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  stockSpecs: string;

  @Prop({ required: true, type: Number })
  stockRating: number;

  @Prop({ required: true })
  driveType: string;

  @Prop({ required: true, type: Number })
  speed: number;

  @Prop({ required: true, type: Number })
  handling: number;

  @Prop({ required: true, type: Number })
  acceleration: number;

  @Prop({ required: true, type: Number })
  launch: number;

  @Prop({ required: true, type: Number })
  braking: number;

  @Prop({ required: true, type: Number })
  offroad: number;

  @Prop({ required: true })
  topSpeed: string;

  @Prop({ required: true })
  zeroToSixty: string;

  @Prop({ required: true })
  zeroToHundred: string;

  @Prop({ required: true })
  gForce: string;

  @Prop({ required: true, type: Number })
  horsePower: number;

  @Prop({ required: true })
  weightLbs: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
