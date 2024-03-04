import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError.error';

export class AuthOwnerCategory {
   static execute = async (request: Request, response: Response, next: NextFunction) => {
      const userId = response.locals.decode.id;
      const params = Number(request.params.id);

      const category = await prisma.category.findUnique({
         where: { id: params }
      });

      if (category?.userId !== userId) {
         throw new AppError(403, 'This user is not the task owner');
      }
      next();
   };
}
