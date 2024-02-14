import z from 'zod';
import { categorySchema } from './category.schema';

export const taskSchema = z.object({
   id: z.number().positive(),
   title: z.string().min(1),
   content: z.string().min(1),
   finished: z.boolean(),
   categoryId: z.number().optional().nullish()
});

export const taskWithCategorySchema = taskSchema.extend({
   category: categorySchema.nullable().optional()
});

export const taskSchemaCreate = taskSchema.omit({ id: true, finished: true });
export const taskSchemaUpdate = taskSchema.omit({ id: true }).partial();
