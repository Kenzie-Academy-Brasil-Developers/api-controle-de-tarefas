import { Router } from 'express';
import { validateId } from '../middlewares/validateId.middleware';
import { CategoryController } from '../controllers/category.controller';
import { ValidateBody } from '../middlewares/validateBody.middleware';
import { categorySchemaCreate } from '../schemas/category.schema';

export const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', ValidateBody.execute(categorySchemaCreate), categoryController.create);
categoryRouter.delete('/:id', validateId.category, categoryController.delete);
