import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticate = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return response.status(200).json(authenticate);
  }
}
