import { z } from 'zod';
import { categorySchema, categorySchemaCreate } from '../schemas/category.schema';

export type TCategory = z.infer<typeof categorySchema>;
export type TCategoryData = z.infer<typeof categorySchemaCreate>;
