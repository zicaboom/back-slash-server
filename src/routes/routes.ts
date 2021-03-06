import { Router } from "express";
import { answerRoutes } from "./answerRoutes";
import { clubRoutes } from "./clubRoutes";
import { questionRoutes } from "./questionRoutes";
import { userRoutes } from "./userRoutes";

const routes = Router();

routes.use(userRoutes);
routes.use(clubRoutes);
routes.use(questionRoutes);
routes.use(answerRoutes);

export { routes };