import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./updateUserAvatarUseCase";

export class UpdateAvatarUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user_id;

    const avatarFile = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id, avatarFile });

    return response.status(204).send();
  }
}
