//cars.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./order.schema";
import { OrderController } from "./order.controller";
import { CarsModule } from "../cars/cars.module";
import { OrderService } from "./order.service";
import { PaymentsModule } from "../payments/payments.module";
import { StripeModule } from "../stripe/stripe.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CarsModule,
    PaymentsModule,
    StripeModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
