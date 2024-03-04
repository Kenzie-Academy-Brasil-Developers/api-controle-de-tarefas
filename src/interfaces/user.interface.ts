import z from 'zod';
import {
   userGetSchemaReturn,
   userLoginSchema,
   userLoginSchemaReturn,
   userRegisterSchema,
   userRegisterSchemaReturn
} from '../schemas/user.schema';

export type TUserRegister = z.infer<typeof userRegisterSchema>;
export type TUserRegisterReturn = z.infer<typeof userRegisterSchemaReturn>;
export type TUserLogin = z.infer<typeof userLoginSchema>;

export type TUserLoginReturn = {
   accessToken: string;
   user: z.infer<typeof userLoginSchemaReturn>;
};

export type TUserGet = z.infer<typeof userGetSchemaReturn>;
