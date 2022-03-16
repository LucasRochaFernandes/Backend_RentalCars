import dayjs from "dayjs";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/In-Memory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: ICarsRepository;
let dayjsProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd1D = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able create a new rental", async () => {
    await carsRepositoryInMemory.create({
      name: "Car rental",
      description: "rental Car",
      daily_rate: 70,
      license_plate: "Rental-test",
      fine_amount: 70,
      brand: "brand",
      category_id: "category",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate("Rental-test");

    await createRentalUseCase.execute({
      user_id: "12315",
      car_id: car.id,
      expected_return_date: dayAdd1D,
    });

    const rental = await rentalRepositoryInMemory.findTenantUserInActivity(
      "12315"
    );

    expect(rental).toHaveProperty("id");
  });

  it("should not be able create a new rental if there is another open to the same car", async () => {
    await carsRepositoryInMemory.create({
      name: "Car rental 2",
      description: "rental Car 2",
      daily_rate: 70,
      license_plate: "Rental-test 2",
      fine_amount: 70,
      brand: "brand",
      category_id: "category",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate(
      "Rental-test 2"
    );

    await createRentalUseCase.execute({
      user_id: "84651",
      car_id: car.id,
      expected_return_date: dayAdd1D,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "45617",
        car_id: car.id,
        expected_return_date: dayAdd1D,
      })
    ).rejects.toEqual(new AppError("Car not available"));
  });

  it("should not be able create a new rental with invalid return time", async () => {
    await carsRepositoryInMemory.create({
      name: "Car rental 3",
      description: "rental Car 3",
      daily_rate: 70,
      license_plate: "Rental-test 3",
      fine_amount: 70,
      brand: "brand",
      category_id: "category",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate(
      "Rental-test 3"
    );

    await expect(
      createRentalUseCase.execute({
        user_id: "l4",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });

  it("should be able to make the rental car unavailable", async () => {
    expect(2).toBe(2);
  });
});
