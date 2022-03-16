import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;

    const images = request.files as IFiles[];
    const filenames = images.map((file) => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const imagesCreated = uploadCarImageUseCase.execute({
      car_id,
      images_name: filenames,
    });

    return response.status(204).json(imagesCreated);
  }
}
