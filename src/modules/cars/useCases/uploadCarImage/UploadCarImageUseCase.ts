import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { injectable, inject } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  private carsImageRepository: ICarImageRepository;

  constructor(
    @inject("CarImageRepository") carsRepo: ICarImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {
    this.carsImageRepository = carsRepo;
  }

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const images: CarImage[] = [];

    images_name.map(async (image) => {
      images.push(
        await this.carsImageRepository.create({ car_id, image_name: image })
      );

      await this.storageProvider.save(image, "cars");
    });

    return images;
  }
}
