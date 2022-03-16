import { Router } from "express";

const specificationRoutes = Router();

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
const createSpecificationController = new CreateSpecificationController();

import { ListSpecificationController } from "@modules/cars/useCases/listSpecification/listSpecificationController";
const listSpecificationController = new ListSpecificationController();

import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

specificationRoutes.post(
  "/",
  ensureUserAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationRoutes.get("/", listSpecificationController.handle);

export { specificationRoutes };
