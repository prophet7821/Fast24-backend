//cars.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car } from "./cars.schema";
import { Filter } from "../types/filter.type";

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

  async getCarsByFilter(filter: Filter) {
    // Deconstruct the filter object for easier access
    const {
      acceleration,
      braking,
      driveType,
      handling,
      launch,
      modelType,
      offroad,
      price,
      speed,
      stockSpecs,
      term,
    } = filter;

    const pipeline = [
      {
        $match: {
          $expr: {
            $and: [
              {
                $cond: [
                  { $eq: [driveType.length, 0] },
                  true,
                  { $in: ["$driveType", driveType] },
                ],
              },
              {
                $cond: [
                  { $eq: [modelType.length, 0] },
                  true,
                  { $in: ["$modelType", modelType] },
                ],
              },
              {
                $cond: [
                  { $eq: [stockSpecs.length, 0] },
                  true,
                  { $in: ["$stockSpecs", stockSpecs] },
                ],
              },
              { $gte: ["$acceleration", acceleration.min] },
              { $lte: ["$acceleration", acceleration.max] },
              { $gte: ["$braking", braking.min] },
              { $lte: ["$braking", braking.max] },
              { $gte: ["$handling", handling.min] },
              { $lte: ["$handling", handling.max] },
              { $gte: ["$launch", launch.min] },
              { $lte: ["$launch", launch.max] },
              { $gte: ["$offroad", offroad.min] },
              { $lte: ["$offroad", offroad.max] },
              { $gte: ["$price", price.min] },
              { $lte: ["$price", price.max] },
              { $gte: ["$speed", speed.min] },
              { $lte: ["$speed", speed.max] },
              {
                $cond: [
                  { $eq: [term, ""] },
                  true,
                  {
                    $or: [
                      {
                        $regexMatch: {
                          input: "$name",
                          regex: new RegExp(term, "i"),
                        },
                      },
                      {
                        $regexMatch: {
                          input: "$modelType",
                          regex: new RegExp(term, "i"),
                        },
                      },
                      {
                        $regexMatch: {
                          input: "$driveType",
                          regex: new RegExp(term, "i"),
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    ];

    return await this.carModel.aggregate(pipeline).exec();
  }
}
