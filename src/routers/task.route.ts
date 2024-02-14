import { Router } from 'express';
import { validateId } from '../middlewares/validateId.middleware';
import { TaskController } from '../controllers/task.controller';
import { ValidateBody } from '../middlewares/validateBody.middleware';
import { taskSchemaCreate, taskSchemaUpdate } from '../schemas/task.schema';
import { ValidateCategory } from '../middlewares/validateCategory.middleware';

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post('/', ValidateBody.execute(taskSchemaCreate), ValidateCategory.execute, taskController.create);
taskRouter.get('/', taskController.findMany);
taskRouter.get('/:id', validateId.task, taskController.findOne);
taskRouter.patch('/:id', validateId.task, ValidateBody.execute(taskSchemaUpdate), taskController.update);
taskRouter.delete('/:id', validateId.task, taskController.delete);
