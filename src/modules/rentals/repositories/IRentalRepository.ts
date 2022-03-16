import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalRepository {
  create(data: ICreateRentalDTO): Promise<void>;
  findByCarInActivity(car_id: string): Promise<Rental>;
  findTenantUserInActivity(user_id: string): Promise<Rental>;
  finById(rental_id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}
