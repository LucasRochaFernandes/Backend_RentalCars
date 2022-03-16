import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";

import multer from "multer";
import uploadConfig from "@config/upload";
const uploadCarImage = multer(uploadConfig);

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
const createCarController = new CreateCarController();

import { ListCarsController } from "@modules/cars/useCases/listAvailableCars/ListCarsController";
const listCarsController = new ListCarsController();

import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
const createCarSpecificationController = new CreateCarSpecificationController();

import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
const uploadCarImagesController = new UploadCarImageController();

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureUserAuthenticated,
  ensureAdmin,
  createCarController.handle
);


carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post(
  "/:car_id/specifications",
  ensureUserAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/:car_id/images",
  ensureUserAuthenticated,
  ensureAdmin,
  uploadCarImage.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
