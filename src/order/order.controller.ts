import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/auth.guard";
import { User as UserDecorator } from "../decorator/user.decorator";
import { User } from "../users/users.schema";
import { OrderService } from "./order.service";
import { Stripe } from "stripe";

@Controller({
  path: "order",
  version: "1",
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("/getOrders")
  @UseGuards(JwtAuthGuard)
  async getOrders(@UserDecorator() user: User) {
    return this.orderService.getOrders(user);
  }
}
