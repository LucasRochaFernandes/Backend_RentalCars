import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  // Bearer "token"
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
    request.user_id = user_id;
  } catch {
    throw new AppError("Invalid token", 401);
  }

  next();
}
