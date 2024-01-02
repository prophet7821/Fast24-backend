// import { InjectModel } from "@nestjs/mongoose";
// import { Order } from "./order.schema";
// import { Model } from "mongoose";
// import {
//   Injectable,
//   NotAcceptableException,
//   NotFoundException,
// } from "@nestjs/common";
// import { User } from "../users/users.schema";
// import { CarsService } from "../cars/cars.service";
// import { PaymentsService } from "../payments/payments.service";
//
// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectModel(Order.name) private orderModel: Model<Order>,
//     private carsService: CarsService,
//     private paymentsService: PaymentsService
//   ) {}
//
//   async getOrders(user: User) {
//     return this.orderModel.find({ user: user["_id"] }).populate("car").exec();
//   }
//
//   async create(car: string, paymentIntent: string, user: User) {
//     const [carData, paymentIntentData] = await Promise.all([
//       this.carsService.getCarById(car),
//       this.paymentsService.retrievePaymentIntent(paymentIntent),
//     ]);
//
//     if (!carData || !paymentIntentData) {
//       throw new NotFoundException("Car or payment intent not found");
//     }
//
//     const existingOrder = await this.orderModel.findOne({
//       paymentIntent: paymentIntent,
//     });
//     if (existingOrder) {
//       throw new NotAcceptableException("Order already exists");
//     }
//
//     const order = new this.orderModel({
//       car: car,
//       user: user["_id"],
//       paymentIntent: paymentIntent,
//       paymentMethod: paymentIntentData["payment_method"],
//       amount: paymentIntentData["amount"],
//       currency: paymentIntentData["currency"],
//     });
//
//     return order.save();
//   }
// }
