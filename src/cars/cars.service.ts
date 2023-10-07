//cars.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car } from "./cars.schema";

@Injectable()
export class CarsService {
  // Constructor injects the Car model.
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  // Fetches cars with optional pagination. If limit is -1, fetches all cars.
  async getAllCars(page = 0, limit = 10): Promise<Car[]> {
    return limit === -1
      ? await this.carModel.find().exec()
      : await this.carModel
          .find()
          .skip(page * limit)
          .limit(limit)
          .exec();
  }

  // Fetches a car by its ID.
  async getCarById(id: string): Promise<Car> {
    const car = await this.carModel.findById(id).exec();
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }
    return car;
  }

  async getCarsBySearch(searchString: string, page = 0, limit = 10) {
    return this.carModel.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: new RegExp(searchString, "i") } },
            { driveType: { $regex: new RegExp(searchString, "i") } },
            { modelType: { $regex: new RegExp(searchString, "i") } },
          ],
        },
      },
      { $skip: page * limit },
      { $limit: limit },
    ]);
  }
}
