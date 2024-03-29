import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const user_id = request.user_id;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    await createRentalUseCase.execute({
      car_id,
      user_id,
      expected_return_date,
    });

    return response.status(201).send();
  }
}
