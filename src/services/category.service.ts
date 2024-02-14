import { injectable } from 'tsyringe';
import { prisma } from '../database/prisma';
import { TCategory, TCategoryData } from '../interfaces/category.interface';

@injectable()
export class CategoryService {
   create = async (data: TCategoryData): Promise<TCategory> => {
      const category = await prisma.category.create({
         data
      });
      return category;
   };

   delete = async (id: number) => {
      const category = await prisma.category.delete({ where: { id } });
      return category;
   };
}
