import { Router } from "express";

const passwordRoutes = Router();

import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
const sendForgotPasswordMailProvider = new SendForgotPasswordMailController();

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailProvider.handle);
passwordRoutes.patch("/reset", resetPasswordUserController.handle);

export { passwordRoutes };

