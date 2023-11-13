//payments.module.ts
import {Module} from "@nestjs/common";
import {StripeModule} from "nestjs-stripe";
import {PaymentsService} from "./payments.service";
import {PaymentsController} from "./payments.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Payment, PaymentSchema} from "./payments.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Payment.name, schema: PaymentSchema}]),
        StripeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                apiKey: configService.get("STRIPE_SECRET"),
                apiVersion: configService.get("STRIPE_API_VERSION"),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule {
}
