import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const { specifications } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id: specifications,
    });

    return response.json(car);
  }
}
