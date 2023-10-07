// cars.controller.ts
import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { CarsService } from "./cars.service"; // Adjust the path based on your directory structure

@Controller({
  path: "cars",
  version: "1",
})
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getAllCars(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number
  ) {
    return this.carsService.getAllCars(+page, +limit); // Convert strings to numbers with the unary plus operator
  }

  @Get("q")
  async search(
    @Query("search") search: string,
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number
  ) {
    return this.carsService.getCarsBySearch(search, page, limit);
  }

  @Get(":id")
  async getCarById(@Param("id") id: string) {
    return this.carsService.getCarById(id);
  }
}
