import { Stripe } from "stripe";
import { Provider } from "@nestjs/common";
import { StripeOptions } from "../interfaces/StripeOptions";
import { getStripeClient } from "../utils/getStripeClient.util";

export const createStripeProvider = (
  options: StripeOptions
): Provider<Stripe> => ({
  provide: "Stripe",
  useValue: getStripeClient(options),
});
