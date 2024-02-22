import {config} from '@/config';
import {PrismaClient} from '@prisma/client';
import Redis from 'ioredis';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = new PrismaClient();

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const result = {} as Omit<User, Key>;

  for (const key in user) {
    if (keys.indexOf(key as unknown as Key) === -1) {
      (result as any)[key] = user[key];
    }
  }

  return result;
}

export const redis = new Redis({
  host: config.REDIS_HOST,
  port: parseInt(config.REDIS_PORT || '6379'),
  password: config.REDIS_PASSWORD,
});
