import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLE_KEY = 'role';
export const Roles = (role: keyof typeof Role | (keyof typeof Role)[]) => SetMetadata(ROLE_KEY, role);
