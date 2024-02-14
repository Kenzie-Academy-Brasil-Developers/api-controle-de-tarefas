import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { container } from 'tsyringe';

export class CategoryController {
   private categoryService = container.resolve(CategoryService);

   create = async (request: Request, response: Response): Promise<Response> => {
      const body = request.body;
      const category = await this.categoryService.create(body);
      return response.status(201).json(category);
   };

   delete = async (request: Request, response: Response): Promise<Response> => {
      const params = Number(request.params.id);
      const category = await this.categoryService.delete(params);
      return response.status(204).json(category);
   };
}
