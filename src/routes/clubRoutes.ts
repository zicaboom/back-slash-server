import { CreateClubController } from "../controllers/clubControllers/CreateClubController";
import { ListClubController } from "../controllers/clubControllers/ListClubController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { DeleteClubController } from "controllers/clubControllers/DeleteClubController";
import { ListClubUsersController } from "controllers/clubControllers/ListClubUsersController";
import { ListClubQuestionsController } from "controllers/clubControllers/ListClubQuestionsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ReportClubController } from "controllers/clubControllers/ReportClubController";

const clubRoutes = Router();

const createClubController = new CreateClubController;
const listClubController = new ListClubController;
const reportClubController = new ReportClubController;
const deleteClubController = new DeleteClubController;
const listClubUsersController = new ListClubUsersController;
const listClubQuestionsController = new ListClubQuestionsController;

clubRoutes.post("/clubs", ensureAuthenticated, createClubController.handle);

clubRoutes.get("/clubs", ensureAuthenticated, listClubController.handle);
clubRoutes.get("/clubs/users/:club_id", ensureAuthenticated, listClubUsersController.handle);
clubRoutes.get("/clubs/questions/:club_id", ensureAuthenticated, listClubQuestionsController.handle);

clubRoutes.put("/clubs/report", ensureAuthenticated, ensureAdmin, reportClubController.handle);

clubRoutes.delete("/clubs/:club_id", ensureAuthenticated, deleteClubController.handle);

export { clubRoutes };