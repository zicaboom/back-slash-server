import { CreateUserService } from "../../services/userServices/CreateUserService";
import { Request, Response } from "express";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, admin } = req.body;

        const createUserService = new CreateUserService;

        const user = await createUserService.execute({ name, email, password, admin });

        return res.json(user);
    }
}

export { CreateUserController };