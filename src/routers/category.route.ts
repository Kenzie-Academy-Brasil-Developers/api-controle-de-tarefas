import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { AuthOwnerCategory } from '../middlewares/AuthOwnerCategory.middleware';
import { AuthToken } from '../middlewares/authToken.middleware';
import { ValidateBody } from '../middlewares/validateBody.middleware';
import { validateId } from '../middlewares/validateId.middleware';
import { categorySchemaCreate } from '../schemas/category.schema';

export const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', AuthToken.execute, ValidateBody.execute(categorySchemaCreate), categoryController.create);
categoryRouter.delete(
   '/:id',
   AuthToken.execute,
   validateId.category,
   AuthOwnerCategory.execute,
   categoryController.delete
);
