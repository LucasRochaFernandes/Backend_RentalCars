import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {

  private categoriesRepository: ICategoryRepository;

  constructor(@inject("CategoriesRepository")categoriesRepository: ICategoryRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ name, description }: IRequest): Promise<void> {

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    await this.categoriesRepository.create({ name, description });
    
  }
}
