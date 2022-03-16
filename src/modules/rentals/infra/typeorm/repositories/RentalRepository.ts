import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
  }
  async finById(rental_id: string): Promise<Rental> {
    return await this.repository.findOne(rental_id);
  }

  async create(data: ICreateRentalDTO): Promise<void> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);
  }
  async findByCarInActivity(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ car_id, end_date: null });
  }
  async findTenantUserInActivity(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ user_id, end_date: null });
  }
}
