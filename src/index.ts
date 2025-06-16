
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!);
