import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface IRequestlist {
  category_id?: string;
  brand?: string;
  name?: string;
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  listAvailable({ category_id, brand, name }: IRequestlist): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  updateAvailable(car_id: string, available: Boolean): Promise<void>;
}
