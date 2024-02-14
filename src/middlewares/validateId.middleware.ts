import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';

export class validateId {
   static task = async (request: Request, response: Response, next: NextFunction) => {
      try {
         const params = Number(request.params.id);

         const search = await prisma.task.findFirst({ where: { id: params } });

         if (!search) {
            return response.status(404).json({ message: 'Task not found' });
         }

         next();
      } catch (error) {
         return response.status(500).json(error);
      }
   };

   static category = async (request: Request, response: Response, next: NextFunction) => {
      try {
         if (request.params) {
            const params = Number(request.params.id);
            const search = await prisma.category.findFirst({ where: { id: params } });

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
