import 'express-async-errors';
import 'reflect-metadata';
import express, { json } from 'express';
import helmet from 'helmet';
import { taskRouter } from './routers/task.route';
import { categoryRouter } from './routers/category.route';
import { HandleErrors } from './errors/handleErrors.error';
import { userRouter } from './routers/user.route';

export const app = express();
app.use(helmet());
app.use(json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);
app.use(HandleErrors.execute);
