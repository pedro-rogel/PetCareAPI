import express from "express";
import pets from "./routerPet.ts";
import adotante from "./routerAdotante.ts";
import endereco from "./routerEndereco.ts";
import { Request, Response } from "express";
import {swaggerSpec, swaggerUi} from "../../swaggerConfig.ts"


const router = (app: express.Router) => {
  app
    .route("/")
    .get((req: Request, res: any) =>
      res.status(200).send("Curso de node Alura pets")
    );
  app.use(express.json(), pets);
  app.use(express.json(), adotante);
  app.use(express.json(), endereco);
  app.use(express.json());
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
};
export default router;
