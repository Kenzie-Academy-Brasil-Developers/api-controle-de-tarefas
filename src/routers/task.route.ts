import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { AuthOwnerTask } from '../middlewares/authOwnerTask.middleware';
import { AuthToken } from '../middlewares/authToken.middleware';
import { ValidateBody } from '../middlewares/validateBody.middleware';
import { ValidateCategory } from '../middlewares/validateCategory.middleware';
import { validateId } from '../middlewares/validateId.middleware';
import { taskCreateBody, taskSchemaUpdate } from '../schemas/task.schema';

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post(
   '/',
   AuthToken.execute,
   ValidateBody.execute(taskCreateBody),
   ValidateCategory.execute,
   taskController.create
);
taskRouter.get('/:id', AuthToken.execute, validateId.task, AuthOwnerTask.execute, taskController.findOne);
taskRouter.get('/', AuthToken.execute, taskController.findMany);
taskRouter.patch(
   '/:id',
   AuthToken.execute,
   ValidateBody.execute(taskSchemaUpdate),
   validateId.task,
   AuthOwnerTask.execute,
   taskController.update
);
taskRouter.delete('/:id', AuthToken.execute, validateId.task, AuthOwnerTask.execute, taskController.delete);
