import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCarUseCase {
  private carsRepository: ICarsRepository;

  constructor(@inject("CarsRepository") carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(data: ICreateCarDTO): Promise<void> {
    const { license_plate } = data;
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists");
    }

    this.carsRepository.create(data);
  }
}
