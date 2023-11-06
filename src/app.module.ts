//app.module.ts
import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {CarsModule} from "./cars/cars.module";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import {PaymentsModule} from "./payments/payments.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as cors from "cors";
import {BullModule} from "@nestjs/bull";
import {NotificationsModule} from "./notifications/notifications.module";

@Module({
    imports: [
        CarsModule,
        AuthModule,
        PaymentsModule,
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get("MONGO_URI"),
            }),
            inject: [ConfigService],
        }),
        //@TODO have setup the basic email sending functionality. Will set it up later.
        NotificationsModule,
        BullModule.forRoot({
            redis: {
                host: "localhost",
                port: 6379,
            },
        }),
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
