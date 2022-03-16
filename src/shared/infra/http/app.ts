import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "@shared/container";

import express, { NextFunction, Request, Response } from "express";
import { router } from "@shared/infra/http/routes";

import createConnection from "@shared/infra/typeorm/index";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";

import { AppError } from "@shared/errors/AppError";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statuscode).json({
        message: err.message,
      });
    } else {
      return response.status(500).json({
        status: "error",
        message: `Internal server error = ${err.message}`,
      });
    }
  }
);

export { app };

// falta node_modules
// falta a pasta tmp na raiz do projeto com /avatar

// branch para o capítulo IV
