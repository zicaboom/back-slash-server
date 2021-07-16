import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateClubController } from "./controllers/CreateClubController";
import { CreateQuestionController } from "./controllers/CreateQuestionController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListClubController } from "./controllers/ListClubController";
import { QuestionJoinClubController } from "./controllers/QuestionJoinClubController";
import { UserJoinClubController } from "./controllers/UserJoinClubController";
import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ApproveClubController } from "./controllers/ApproveClubController";
import { ListUserController } from "./controllers/ListUserController";
import { ListQuestionByClubController } from "./controllers/ListQuestionByClubController";
import { ListQuestionController } from "./controllers/ListQuestionController";
import { DeleteUserController } from "./controllers/DeleteUserController";

const routes = Router();

const createUserController = new CreateUserController;
const createClubController = new CreateClubController;
const authenticateUserController = new AuthenticateUserController;
const userJoinClubController = new UserJoinClubController;
const createQuestionController = new CreateQuestionController;
const questionJoinClubController = new QuestionJoinClubController;
const listClubController = new ListClubController;
const approveClubController = new ApproveClubController;
const listUserController = new ListUserController;
const listQuestionByClubController = new ListQuestionByClubController;
const listQuestionController = new ListQuestionController;
const deleteUserController = new DeleteUserController;

routes.post("/users", createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.post("/clubs", ensureAuthenticated, createClubController.handle);
routes.post("/users/join", ensureAuthenticated, userJoinClubController.handle);
routes.post("/questions", ensureAuthenticated, createQuestionController.handle);
routes.post("/questions/join", ensureAuthenticated, questionJoinClubController.handle);

routes.get("/clubs", ensureAuthenticated, listClubController.handle);
routes.get("/users", ensureAuthenticated, listUserController.handle);
routes.get("/questions/:club", ensureAuthenticated, listQuestionByClubController.handle);
routes.get("/questions", ensureAuthenticated, listQuestionController.handle);

routes.put("/clubs/approve", ensureAuthenticated, ensureAdmin, approveClubController.handle);

routes.delete("/users", ensureAuthenticated, deleteUserController.handle);

export { routes };