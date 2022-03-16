import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";

const uploadAvatar = multer(uploadConfig);

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarUserController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";

const createUserController = new CreateUserController();

const usersRoutes = Router();

const updateAvatarUserController = new UpdateAvatarUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  ensureUserAuthenticated,
  updateAvatarUserController.handle
);

export { usersRoutes };
