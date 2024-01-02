import { DynamicModule, Module } from "@nestjs/common";
import { StripeOptions } from "./interfaces/StripeOptions";
import { StripeAsyncOptions } from "./interfaces/StripeAsyncOptions";
import { CoreModule } from "./core/core.module";

@Module({})
export class StripeModule {
  public static forRoot(options: StripeOptions): DynamicModule {
    return {
      module: StripeModule,
      imports: [CoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: StripeAsyncOptions): DynamicModule {
    return {
      module: StripeModule,
      imports: [CoreModule.forRootAsync(options)],
    };
  }
}
