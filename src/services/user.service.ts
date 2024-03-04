import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError.error';
import {
   TUserGet,
   TUserLogin,
   TUserLoginReturn,
   TUserRegister,
   TUserRegisterReturn
} from '../interfaces/user.interface';
import { userGetSchemaReturn, userLoginSchemaReturn, userRegisterSchemaReturn } from '../schemas/user.schema';

@injectable()
export class UserService {
   register = async (body: TUserRegister): Promise<TUserRegisterReturn> => {
      const hashPassword = await bcrypt.hash(body.password, 10);

      const user = {
         ...body,
         password: hashPassword
      };

      const userCreate = await prisma.user.create({ data: user });

      return userRegisterSchemaReturn.parse(userCreate);
   };

   login = async (body: TUserLogin): Promise<TUserLoginReturn> => {
      const user = await prisma.user.findFirst({ where: { email: body.email } });

      if (!user) {
         throw new AppError(404, 'User not exists');
      }

      const compare = await bcrypt.compare(body.password, user.password);

      if (!compare) {
         throw new AppError(401, "Email and password doesn't match");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

      return { accessToken: token, user: userLoginSchemaReturn.parse(user) };
   };

   getUser = async (id: number): Promise<TUserGet | null> => {
      const user = await prisma.user.findUnique({
         where: {
            id
         }
      });

      return userGetSchemaReturn.parse(user);
   };
}
