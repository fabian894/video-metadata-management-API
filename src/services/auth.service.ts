import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

const users: User[] = [];  // This is just a mock, replace it with a database in production

export class AuthService {
  static register(username: string, password: string): User {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    return newUser;
  }

  static login(username: string, password: string): string | null {
    const user = users.find((u) => u.username === username);
    if (!user) return null;

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return null;

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: process.env.JWT_EXPIRATION || '1h',
    });

    return token;
  }
}
