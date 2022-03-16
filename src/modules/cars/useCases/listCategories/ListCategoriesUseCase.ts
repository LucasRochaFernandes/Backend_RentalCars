import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class ListCategoriesUseCase {
  private categoryRepo: ICategoryRepository;

  constructor(@inject("CategoriesRepository")categoryRepo: ICategoryRepository) {
    this.categoryRepo = categoryRepo;
  }

  async execute(): Promise<Category[]> {
    const all = await this.categoryRepo.list();
    return all;
  }
}
