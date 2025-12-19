import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import fs from 'fs';

const testEnvFile = `.env.test`;
const envFile = `.env`;

if (!fs.existsSync(envFile)) {
  throw new Error('.env file not found');
}

if (!fs.existsSync(testEnvFile)) {
  throw new Error('.env.test file found');
}

dotenv.config({ path: envFile });
dotenv.config({ path: testEnvFile, override: true });

const host = process.env.DATABASE_HOST as string;
const database = process.env.DATABASE_NAME as string;

console.log(`Migrating database ${database} on host ${host}`);

export default defineConfig({
  schema: './src/module/billing/persistence/database.schema.ts',
  out: __dirname + '/migration',
  dialect: 'postgresql',
  tablesFilter: ['Subscription', 'Plan'],
  dbCredentials: {
    host,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database,
    ssl: false,
  },

  verbose: true,
});
