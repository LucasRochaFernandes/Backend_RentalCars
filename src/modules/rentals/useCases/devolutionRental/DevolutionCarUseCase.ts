import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

@injectable()
export class DevolutionCarUseCase {
  private rentalRepository: IRentalRepository;
  private carsRepository: ICarsRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("RentalRepository") rentalRepo: IRentalRepository,
    @inject("CarsRepository") carsRepo: ICarsRepository,
    @inject("DateProvider") dateProvider: IDateProvider
  ) {
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepo;
    this.rentalRepository = rentalRepo;
  }

  async execute(rental_id: string): Promise<Rental> {
    const rental = await this.rentalRepository.finById(rental_id);

    if (!rental) {
      throw new AppError("Rental Not Found");
    }

    if (rental.end_date) {
      throw new AppError("Rental already returned");
    }

    rental.end_date = this.dateProvider.dateNow();

    const car = await this.carsRepository.findById(rental.car_id);

    const diffInDays = this.dateProvider.compareInDays(
      rental.start_date,
      rental.expected_return_date
    );

    rental.total = diffInDays * car.daily_rate;

    const delay = this.dateProvider.compareHours(
      this.dateProvider.dateNow(),
      rental.expected_return_date
    );

    if (delay < 0) {
      let daysDelay: number = Math.trunc((-1 * delay) / 24);

      const extraHours: number = (-1 * delay) / 24 - daysDelay;

      if (extraHours) {
        daysDelay += 1;
      }

      rental.total += car.fine_amount * daysDelay;
    }

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);

    rental.updated_at = this.dateProvider.dateNow();
    return rental;
  }
}
