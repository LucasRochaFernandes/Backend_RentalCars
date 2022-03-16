import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalByUserUseCase {
  private rentalsRepository: IRentalRepository;

  constructor(@inject("RentalRepository") rentalsRepo: IRentalRepository) {
    this.rentalsRepository = rentalsRepo;
  }

  async execute(user_id: string): Promise<Rental[]> {
    const rental = await this.rentalsRepository.findByUser(user_id);
    rental.map((rental) => {
      delete rental.car_id;
    });
    return rental;
  }
}
