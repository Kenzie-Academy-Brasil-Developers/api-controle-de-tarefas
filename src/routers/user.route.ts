import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { container } from 'tsyringe';
import { ValidateBody } from '../middlewares/validateBody.middleware';
import { userRegisterSchema } from '../schemas/user.schema';
import { ValidateUser } from '../middlewares/validateUser.middleware';
import { AuthToken } from '../middlewares/authToken.middleware';

export const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.get('/profile', AuthToken.execute, userController.getUser);
userRouter.post('/', ValidateBody.execute(userRegisterSchema), ValidateUser.execute, userController.register);
userRouter.post('/login', userController.login);
