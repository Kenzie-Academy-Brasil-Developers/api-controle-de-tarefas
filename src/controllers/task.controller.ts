import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { container } from 'tsyringe';

export class TaskController {
   private taskService = container.resolve(TaskService);

   create = async (request: Request, response: Response): Promise<Response> => {
      const body = request.body;
      const task = await this.taskService.create(body);
      return response.status(201).json(task);
   };

   findOne = async (request: Request, response: Response): Promise<Response> => {
      const id = Number(request.params.id);
      const task = await this.taskService.findOne(id);
      return response.status(200).json(task);
   };

   findMany = async (request: Request, response: Response): Promise<Response> => {
      const { category } = request.query;
      const tasks = await this.taskService.findMany(category as string);
      return response.status(200).json(tasks);
   };

   update = async (request: Request, response: Response): Promise<Response> => {
      const params = Number(request.params.id);
      const body = request.body;
      const task = await this.taskService.update(params, body);
      return response.status(200).json(task);
   };

   delete = async (request: Request, response: Response): Promise<Response> => {
      const params = Number(request.params.id);
      const task = await this.taskService.delete(params);
      return response.status(204).json(task);
   };
}
