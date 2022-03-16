import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be possible to list all available cars", async (): Promise<void> => {
    const carList = {
      id: "123",
      name: "car listened",
      description: "listing",
      daily_rate: 40,
      license_plate: "OFD-0000",
      fine_amount: 40,
      brand: "apenas",
      category_id: "category_id",
      available: true,
    };
    await carsRepositoryInMemory.create(carList);

    let allCars = await listCarsUseCase.execute({});

    expect(allCars).toEqual([carList]);

    carList.available = false;

    allCars = await listCarsUseCase.execute({});

    expect(allCars).toBeUndefined;
  });

  it("It should be possible to list all available cars by category id", async () => {
    const carList2 = {
      id: "1234",
      name: "car listened 2",
      description: "listing 2",
      daily_rate: 40,
      license_plate: "OFD-0001",
      fine_amount: 40,
      brand: "apenas",
      category_id: "category_id",
      available: true,
    };
    await carsRepositoryInMemory.create(carList2);

    const carByCategory = await listCarsUseCase.execute({
      category_id: carList2.category_id,
    });

    expect(carByCategory).toEqual([carList2]);
  });
  it("It should be possible to list all available cars by mark name", async () => {
    const carList3 = {
      id: "12345",
      name: "car listened 3",
      description: "listing 3",
      daily_rate: 40,
      license_plate: "OFD-0002",
      fine_amount: 40,
      brand: "vingadores",
      category_id: "category_id",
      available: true,
    };
    await carsRepositoryInMemory.create(carList3);

    const carByBrand = await listCarsUseCase.execute({
      brand: carList3.brand,
    });

    expect(carByBrand).toEqual([carList3]);
  });
  it("ItIt should be possible to list all available cars by car name", async () => {
    const carList4 = {
      id: "123456",
      name: "car listened 4",
      description: "listing 4",
      daily_rate: 40,
      license_plate: "OFD-0003",
      fine_amount: 40,
      brand: "apenas",
      category_id: "category_id",
      available: true,
    };
    await carsRepositoryInMemory.create(carList4);

    const carByName = await listCarsUseCase.execute({
      name: carList4.name,
    });

    expect(carByName).toEqual([carList4]);
  });
});
