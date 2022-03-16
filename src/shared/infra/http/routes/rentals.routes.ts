import { Router } from "express";
const rentalsRoutes = Router();

import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
const createRentalController = new CreateRentalController();

import { DevoultionCarController } from "@modules/rentals/useCases/devolutionRental/DevolutionCarController";
const devoultionCarController = new DevoultionCarController();

import { ListRentalByUserController } from "@modules/rentals/useCases/listRental/ListRentalByUserController";
const listRentalsByUserController = new ListRentalByUserController();

rentalsRoutes.post("/", ensureUserAuthenticated, createRentalController.handle);
rentalsRoutes.put(
  "/devolution/:rental_id",
  ensureUserAuthenticated,
  devoultionCarController.handle
);
rentalsRoutes.get(
  "/user",
  ensureUserAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
