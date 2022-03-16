import { IRequestlist } from "@modules/cars/repositories/ICarsRepository";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand }: IRequestlist = request.query;


    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = await listCarsUseCase.execute({ category_id, name, brand });

    return response.status(200).json(cars);
  }
}
