//app.module.ts
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CarsModule } from "./cars/cars.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import * as cors from "cors";
import { BookingModule } from "./bookings/booking.module";
import { PaymentsModule } from "./payments/payments.module";

@Module({
  imports: [
    CarsModule,
    AuthModule,
    BookingModule,
    PaymentsModule,
    MongooseModule.forRoot("mongodb://localhost:27017/fast24"),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes("/");
  }
}
