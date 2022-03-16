import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "category",
      description: "Category description test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreate = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreate).toHaveProperty("id");
  });

  it("should be able to create a new category with name exists", async () => {
    await categoriesRepositoryInMemory.create({
      name: "same category",
      description: "Category description",
    });

    await expect(
      createCategoryUseCase.execute({
        name: "same category",
        description: "Category description",
      })
    ).rejects.toEqual(new AppError("Category already exists"));
  });
});
