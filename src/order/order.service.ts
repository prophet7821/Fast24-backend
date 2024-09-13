import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./order.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { User } from "../users/users.schema";
import { CarsService } from "../cars/cars.service";
import { PaymentsService } from "../payments/payments.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private carsService: CarsService,
    private paymentsService: PaymentsService
  ) {}

  async getOrders(user: User) {
    return this.orderModel.find({ user: user["_id"] }).populate("car").exec();
  }
}
