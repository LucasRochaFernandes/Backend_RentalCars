import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionCarUseCase } from "./DevolutionCarUseCase";

export class DevoultionCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { rental_id } = request.params;
    const devolutionCarUseCase = container.resolve(DevolutionCarUseCase);
    const rental = await devolutionCarUseCase.execute(rental_id);
    return response.status(200).json(rental);
  }
}
