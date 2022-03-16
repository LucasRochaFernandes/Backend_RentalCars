import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = {
      name: "name Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };
    await createCarUseCase.execute(car);

    const carCreated = await carsRepositoryInMemory.findByLicensePlate(
      car.license_plate
    );

    expect(carCreated).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "name Car 2",
      description: "description car 2",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "name Car 2",
        description: "description car 2",
        daily_rate: 100,
        license_plate: "DEF-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create a car with available true by default", async () => {
    const carAvailable = {
      name: "Car Available",
      description: "description car available",
      daily_rate: 100,
      license_plate: "DEF-5678",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };

    await createCarUseCase.execute(carAvailable);

    const carAvailableCreated = await carsRepositoryInMemory.findByLicensePlate(
      carAvailable.license_plate
    );

    expect(carAvailableCreated.available).toBe(true);
  });
});
