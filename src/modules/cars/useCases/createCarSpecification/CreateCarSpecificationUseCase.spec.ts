import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications = ["fodase"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id: specifications,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specifications to the car", async () => {
    await carsRepositoryInMemory.create({
      name: "Car Available",
      description: "description car available",
      daily_rate: 100,
      license_plate: "DEF-5678",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate("DEF-5678");

    await specificationRepositoryInMemory.create({
      name: "spec ex",
      description: "exemplo",
    });

    const specification = await specificationRepositoryInMemory.findByName(
      "spec ex"
    );

    const specifications = [specification.id];
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: specifications,
    });

    const carWithSpec = await carsRepositoryInMemory.findById(car.id);

    expect(carWithSpec).toHaveProperty("specifications");

    expect(carWithSpec.specifications.length).toBe(1);
  });
});
