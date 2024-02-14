import z from 'zod';

export const categorySchema = z.object({
   id: z.number().positive(),
   name: z.string().min(1)
});

export const categorySchemaCreate = categorySchema.omit({ id: true });
