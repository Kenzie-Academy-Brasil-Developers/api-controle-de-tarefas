import { injectable } from 'tsyringe';
import { prisma } from '../database/prisma';
import { TCategory, TCategoryData } from '../interfaces/category.interface';

@injectable()
export class CategoryService {
   create = async (body: TCategoryData, userId: number): Promise<TCategory> => {
      const category = await prisma.category.create({
         data: { ...body, userId }
      });
      return category;
   };

   delete = async (id: number) => {
      const category = await prisma.category.delete({ where: { id } });
      return category;
   };
}
