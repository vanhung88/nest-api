import { User } from '@prisma/client';

export type JWTUser = Pick<User, 'id' | 'email'>;

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
