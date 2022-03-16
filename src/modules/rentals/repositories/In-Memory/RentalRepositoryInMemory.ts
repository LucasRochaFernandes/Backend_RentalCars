import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "../IRentalRepository";

export class RentalRepositoryInMemory implements IRentalRepository {
  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
  rentals: Rental[] = [];
  async finById(rental_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === rental_id);
  }

  async findByCarInActivity(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );
  }
  async findTenantUserInActivity(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    );
  }
  async create(data: ICreateRentalDTO): Promise<void> {
    const newRental = new Rental();
    Object.assign(newRental, data);
    this.rentals.push(newRental);
  }
}
