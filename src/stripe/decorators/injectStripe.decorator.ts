import { Inject } from "@nestjs/common";
import { stripeToken } from "../constants/stripeToken";

export function InjectStripe() {
  return Inject(stripeToken);
}
