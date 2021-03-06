import { Request, Response } from "express";
import { ListUserService } from "../../services/userServices/ListUserService";

class ListUserController{
    async handle(_: Request, res:Response){
        const listUserService = new ListUserService;

        const user = await listUserService.execute();

        return res.json(user);
    }
}

export { ListUserController };