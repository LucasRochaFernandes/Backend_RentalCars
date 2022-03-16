import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import {
  ICarsRepository,
  IRequestlist,
} from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCarsUseCase {
  private carsRepository: ICarsRepository;

  constructor(@inject("CarsRepository") carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({ category_id, brand, name }: IRequestlist): Promise<Car[]> {
    return await this.carsRepository.listAvailable({
      category_id,
      brand,
      name,
    });
  }
}
