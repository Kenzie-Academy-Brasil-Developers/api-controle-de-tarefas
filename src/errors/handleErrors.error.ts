import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class HandleErrors {
   static execute (error: Error, _: Request, response: Response, __: NextFunction) {
      if (error instanceof ZodError) {
         return response.status(400).json({ message: error });
      }
      console.log(error);
      return response.status(500).json({ message: 'internal server error' });
   }
}
