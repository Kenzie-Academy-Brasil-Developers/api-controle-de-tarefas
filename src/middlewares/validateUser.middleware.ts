import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';

export class ValidateUser {
   static execute = async (request: Request, response: Response, next: NextFunction) => {
      try {
         if (request.body.email) {
            const email = request.body.email;
            const search = await prisma.user.findFirst({ where: { email } });

            if (search) {
               return response.status(409).json({ message: 'This email is already registered' });
            }
         }

         next();
      } catch (error) {
         return response.status(500).json(error);
      }
   };
}
