import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalByUserUseCase } from "./ListRentalByUserUseCase";
export class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user_id;

    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);

    const rentals = await listRentalByUserUseCase.execute(user_id);

    return response.status(200).json(rentals);
  }
}
