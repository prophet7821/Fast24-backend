import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { StripeOptions } from "../interfaces/StripeOptions";
import { getStripeClient } from "../utils/getStripeClient.util";
import { StripeAsyncOptions } from "../interfaces/StripeAsyncOptions";
import { Stripe } from "stripe";
import { StripeOptionsFactory } from "../interfaces/StripeOptionsFactory";
import { stripeToken } from "../constants/stripeToken";
import { stripeModuleOptions } from "../constants/stripeModuleOptions";

@Global()
@Module({})
export class CoreModule {
  public static forRoot(options: StripeOptions): DynamicModule {
    const provider: Provider<Stripe> = {
      provide: stripeToken,
      useValue: getStripeClient(options),
    };

    return {
      exports: [provider],
      module: CoreModule,
      providers: [provider],
    };
  }

  public static forRootAsync(options: StripeAsyncOptions): DynamicModule {
    const provider: Provider = {
      inject: [stripeModuleOptions],
      provide: stripeToken,
      useFactory: (stripeOptions: StripeOptions) => {
        return getStripeClient(stripeOptions);
      },
    };

    return {
      exports: [provider],
      imports: options.imports,
      module: CoreModule,
      providers: [...this.createAsyncProviders(options), provider],
    };
  }

  private static createAsyncProviders(options: StripeAsyncOptions) {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: StripeAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: stripeModuleOptions,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: stripeModuleOptions,
      useFactory: (optionsFactory: StripeOptionsFactory) =>
        optionsFactory.createStripeOptions(),
    };
  }
}
