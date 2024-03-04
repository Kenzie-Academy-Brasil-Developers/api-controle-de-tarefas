import { prisma } from '../database/prisma';
import { TTask, TTaskSchema, TTaskUpdate, TaskWithCategoryType } from '../interfaces/task.interface';
import { injectable } from 'tsyringe';

@injectable()
export class TaskService {
   create = async (body: TTask, id: number): Promise<TTaskSchema> => {
      const task = await prisma.task.create({
         data: { ...body, userId: id }
      });
      return task;
   };

   findOne = async (id: number): Promise<TaskWithCategoryType | null> => {
      const task = await prisma.task.findFirst({
         where: {
            id
         }
      });

      return task;
   };

   findMany = async (categoryName?: string, id?: number): Promise<TaskWithCategoryType[]> => {
      const tasks = await prisma.task.findMany({
         where: {
            userId: id,
            ...(categoryName && {
               category: { name: categoryName }
            })
         },
         include: {
            category: true
         }
      });
      return tasks;
   };

   update = async (id: number, data: TTaskUpdate): Promise<TTaskSchema> => {
      const task = await prisma.task.update({
         where: { id },
         data
      });

      return task;
   };

   delete = async (id: number) => {
      const task = await prisma.task.delete({ where: { id } });
      return task;
   };
}
