import { User } from '@prisma/client';

export type JWTUser = Pick<User, 'id' | 'username'>;
