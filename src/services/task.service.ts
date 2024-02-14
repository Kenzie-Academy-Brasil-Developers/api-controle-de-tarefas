import { prisma } from '../database/prisma';
import { TTask, TTaskSchema, TTaskUpdate, TaskWithCategoryType } from '../interfaces/task.interface';
import { injectable } from 'tsyringe';

@injectable()
export class TaskService {
   create = async (data: TTask): Promise<TTaskSchema> => {
      const task = await prisma.task.create({
         data
      });
      return task;
   };

   findOne = async (id: number): Promise<TaskWithCategoryType | null> => {
      const task = await prisma.task.findFirst({
         where: {
            id
         },
         include: {
            category: true
         }
      });

      return task;
   };

   findMany = async (categoryName?: string): Promise<TaskWithCategoryType[] | null> => {
      const tasks = await prisma.task.findMany({
         where: {
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
