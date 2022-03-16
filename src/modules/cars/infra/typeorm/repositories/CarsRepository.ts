import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import {
  ICarsRepository,
  IRequestlist,
} from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder("cars")
      .update()
      .set( {available} )
      .where("id = :car_id", { car_id })
      .execute();
  }
  async findById(car_id: string): Promise<Car> {
    return await this.repository.findOne(car_id);
  }
  async listAvailable({
    category_id,
    brand,
    name,
  }: IRequestlist): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", { brand });
    }
    if (category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", { category_id });
    }
    if (name) {
      carsQuery.andWhere("cars.name = :name", { name });
    }

    return await carsQuery.getMany();
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate });
  }
  async create(data: ICreateCarDTO): Promise<void> {
    const newCar = this.repository.create(data);

    await this.repository.save(newCar);
  }
}
