import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import { UserService } from '../services/user.service';

@injectable()
export class UserController {
   private userService: UserService = container.resolve(UserService);

   register = async (request: Request, response: Response) => {
      const body = request.body;
      const register = await this.userService.register(body);
      return response.status(201).json(register);
   };

   login = async (request: Request, response: Response) => {
      const body = request.body;
      const login = await this.userService.login(body);
      return response.status(200).json(login);
   };

   getUser = async (request: Request, response: Response) => {
      const id = response.locals.decode.id;
      const user = await this.userService.getUser(id);
      return response.status(200).json(user);
   };
}
