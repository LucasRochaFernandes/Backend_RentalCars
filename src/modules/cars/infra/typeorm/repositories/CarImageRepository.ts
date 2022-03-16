import {
  ICarImageRepository,
  IRequest,
} from "@modules/cars/repositories/ICarImageRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

export class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(data: IRequest): Promise<CarImage> {
    const carImage = this.repository.create(data);
    await this.repository.save(carImage);
    return carImage;
  }
}
