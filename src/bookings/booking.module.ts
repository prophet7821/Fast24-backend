import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Booking, BookingSchema } from "./booking.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class BookingModule {}
