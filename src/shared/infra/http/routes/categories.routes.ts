import { Router } from "express";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
const createCategoryController = new CreateCategoryController();

import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
const importCategoryController = new ImportCategoryController();

import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
const listCategoriesController = new ListCategoriesController();

import multer from "multer";
import { ensureUserAuthenticated } from "../middlewares/ensureUserAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

categoriesRoutes.post(
  "/",
  ensureUserAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  ensureUserAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
