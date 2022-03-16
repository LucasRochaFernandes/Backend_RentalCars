import { Router } from "express";
const authenticateRoutes = Router();

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/authenticateUserController";
const authenticateUserController = new AuthenticateUserController();

import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
