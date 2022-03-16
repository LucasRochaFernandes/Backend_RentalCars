import csvParser from "csv-parser";
import fs from "fs";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ImportCategoryUseCase {
  private categoriesRepository: ICategoryRepository;

  constructor(
    @inject("CategoriesRepository") categoriesRepository: ICategoryRepository
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParser();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      const { NAME, DESCRIPTION } = line;
      await this.categoriesRepository.create({
        name: NAME,
        description: DESCRIPTION,
      });
    });
  }

  execute(file: Express.Multer.File): void {
    this.loadCategories(file);
  }
}
