import { User } from '../models/user.model'; // Adjust this path according to where you define your user model
import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: any;  // Add the `user` property to the Request interface
    }
  }
}