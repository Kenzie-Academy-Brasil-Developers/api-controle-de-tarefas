import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AppError } from './AppError.error';

export class HandleErrors {
   static execute (error: Error, _: Request, response: Response, __: NextFunction) {
      if (error instanceof AppError) {
         return response.status(error.statusCode).json({ message: error.message });
      }
      if (error instanceof ZodError) {
         return response.status(400).json({ message: error });
      }
      if (error instanceof JsonWebTokenError) {
         return response.status(401).json(error);
      }
      console.log(error);
      return response.status(500).json({ message: 'internal server error' });
   }
}
