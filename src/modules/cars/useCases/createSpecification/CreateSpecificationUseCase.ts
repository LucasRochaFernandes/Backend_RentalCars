import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  private specificationsRepository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    specificationRepository: ISpecificationRepository
  ) {
    this.specificationsRepository = specificationRepository;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
