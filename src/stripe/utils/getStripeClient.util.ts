import { StripeOptions } from "../interfaces/StripeOptions";
import { Stripe } from "stripe";

export const getStripeClient = ({
  apiKey,
  ...options
}: StripeOptions): Stripe => new Stripe(apiKey, { ...options });
