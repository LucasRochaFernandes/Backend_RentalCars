import { CarImage } from "../infra/typeorm/entities/CarImage";

export interface IRequest {
  car_id: string;
  image_name: string;
}

export interface ICarImageRepository {
  create(data: IRequest): Promise<CarImage>;
}
