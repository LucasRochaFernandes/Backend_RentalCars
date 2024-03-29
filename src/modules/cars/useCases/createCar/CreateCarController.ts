import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    await createCarUseCase.execute(data);

    return response.status(201).send();
  }
}
