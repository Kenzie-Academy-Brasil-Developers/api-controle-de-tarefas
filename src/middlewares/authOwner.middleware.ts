import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError.error';

export class AuthOwner {
   static execute = async (request: Request, response: Response, next: NextFunction) => {
      const userId = response.locals.decode.id;
      const params = Number(request.params.id);

      const user = await prisma.user.findUnique({
         where: { id: params }
      });

      if (user?.id !== userId) {
         throw new AppError(401, 'This user is not the task owner');
      }
      next();
   };
}
