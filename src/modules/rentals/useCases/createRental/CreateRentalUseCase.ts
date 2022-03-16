import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRentalUseCase {
  private rentalRepository: IRentalRepository;
  private dateProvider: IDateProvider;
  private carsRepository: ICarsRepository;

  constructor(
    @inject("RentalRepository") rentalRepository: IRentalRepository,
    @inject("DateProvider") dateProvider: IDateProvider,
    @inject("CarsRepository") carsRepo: ICarsRepository
  ) {
    this.carsRepository = carsRepo;
    this.rentalRepository = rentalRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<void> {
    const minimumHour = 24;

    const carNotAvailable = await this.rentalRepository.findByCarInActivity(
      car_id
    );

    if (carNotAvailable) {
      throw new AppError("Car not available");
    }

    const tenantUser = await this.rentalRepository.findTenantUserInActivity(
      user_id
    );

    if (tenantUser) {
      throw new AppError("Lease-time user");
    }

    // expected_return_date teve ter no mínimo 1 dia de duração/previsão
    // existe a opção de adicionar 1 segundo no expected_return_date e forçar as 24 horas

    const compare = this.dateProvider.compareHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError("Invalid return time");
    }

    await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);
  }
}
