import z from 'zod';
import { taskSchema } from './task.schema';
import { categorySchema } from './category.schema';

export const userSchema = z.object({
   id: z.number(),
   name: z.string(),
   email: z.string().email(),
   password: z.string(),
   task: z.array(taskSchema),
   category: z.array(categorySchema)
});

export const userRegisterSchema = userSchema.pick({ name: true, email: true, password: true });
export const userRegisterSchemaReturn = userSchema.pick({ id: true, name: true, email: true });
export const userLoginSchema = userSchema.pick({ name: true, email: true, password: true });
export const userLoginSchemaReturn = userSchema.pick({ id: true, name: true, email: true });
export const userGetSchemaReturn = userSchema.pick({ id: true, name: true, email: true });
