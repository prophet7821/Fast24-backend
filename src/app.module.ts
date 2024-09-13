//app.module.ts
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CarsModule } from "./cars/cars.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { PaymentsModule } from "./payments/payments.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as cors from "cors";
// import { OrderModule } from "./order/order.module";
import { StripeModule } from "./stripe/stripe.module";
import { OrderModule } from "./order/order.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    CarsModule,
    AuthModule,
    PaymentsModule,
    OrderModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: ".",
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get("STRIPE_SECRET"),
        apiVersion: configService.get("STRIPE_API_VERSION"),
      }),
      inject: [ConfigService],
    }),
    //@TODO have setup the basic email sending functionality. Will set it up later.
    // NotificationsModule,
    // BullModule.forRoot({
    //     redis: {
    //         host: "localhost",
    //         port: 6379,
    //     },
    // }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     auth: {
    //       user:
    //       pass:
    //     },
    //   },
    //   template: {
    //     dir: join(__dirname, "templates"),
    //     adapter: new HandlebarsAdapter(),
    //   },
    // }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes("/");
  }
}
