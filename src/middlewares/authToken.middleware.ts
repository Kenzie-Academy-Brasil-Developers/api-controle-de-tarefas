import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.error';
import jwt from 'jsonwebtoken';

export class AuthToken {
   static execute (request: Request, response: Response, next: NextFunction) {
      const authorization = request.headers.authorization;

      const token = authorization?.replace('Bearer ', '');

      if (!token) {
         throw new AppError(401, 'Token is required');
      }

      jwt.verify(token, process.env.JWT_SECRET! as string);

      response.locals.decode = jwt.decode(token);

      next();
   }
}
