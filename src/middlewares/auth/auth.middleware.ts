import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decodedToken = jwt.verify(token.toString(), 'your-secret-key');
      req['user'] = { userId: decodedToken['userId'] };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
