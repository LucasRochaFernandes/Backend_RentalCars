import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const user_id = request.user_id;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(user_id);

  if (!user.isAdmin) {
    throw new AppError("User is not admin");
  }

  next();
}
