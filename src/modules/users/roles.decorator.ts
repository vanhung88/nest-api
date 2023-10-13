import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user.interface';

export const Roles = (...role: UserRole[]) => SetMetadata('roles', role);
