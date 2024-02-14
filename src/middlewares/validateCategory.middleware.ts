import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';

export class ValidateCategory {
   static execute = async (request: Request, response: Response, next: NextFunction) => {
      try {
         if (request.body.categoryId) {
            const category = request.body.categoryId;
            const search = await prisma.category.findFirst({ where: { id: category } });

            if (!search) {
               return response.status(404).json({ message: 'Category not found' });
            }
         }

         next();
      } catch (error) {
         return response.status(500).json(error);
      }
   };
}
