import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, IRequestlist } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === car_id);
    this.cars[index].available = available;
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }
  async listAvailable({
    category_id,
    brand,
    name,
  }: IRequestlist): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (car.available === true) {
        if (category_id && car.category_id === category_id) {
          return car;
        }
        if (name && car.name === name) {
          return car;
        }
        if (brand && car.brand === brand) {
          return car;
        }
        if (!category_id && !name && !brand) {
          return car;
        }
      }
      return undefined;
    });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async create(data: ICreateCarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
  }
}
