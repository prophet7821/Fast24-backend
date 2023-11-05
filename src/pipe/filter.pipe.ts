import { Injectable, PipeTransform } from "@nestjs/common";
import { filterDTO } from "../types/filter.dto";

@Injectable()
export class ParseFilterPipe implements PipeTransform {
  transform(value: filterDTO) {
    return {
      term: value.term,
      modelType: value.modelType ? value.modelType.split(",") : [],
      driveType: value.driveType ? value.driveType.split(",") : [],
      stockSpecs: value.stockSpecs ? value.stockSpecs.split(",") : [],
      price: {
        min: parseFloat(value.price.min).toLocaleString(),
        max: parseFloat(value.price.max).toLocaleString(),
      },
      speed: {
        min: parseFloat(value.speed.min),
        max: parseFloat(value.speed.max),
      },
      handling: {
        min: parseFloat(value.handling.min),
        max: parseFloat(value.handling.max),
      },
      acceleration: {
        min: parseFloat(value.acceleration.min),
        max: parseFloat(value.acceleration.max),
      },
      launch: {
        min: parseFloat(value.launch.min),
        max: parseFloat(value.launch.max),
      },
      braking: {
        min: parseFloat(value.braking.min),
        max: parseFloat(value.braking.max),
      },
      offroad: {
        min: parseFloat(value.offroad.min),
        max: parseFloat(value.offroad.max),
      },
    };
  }
}
