import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

import { required } from './src/env';

config({ path: '.env' });

export default defineConfig({
  dbCredentials: { url: required('ADMIN_DATABASE_URL') },
  dialect: 'postgresql',
  out: './src/migrations',
  schema: './src/schemas/*',
  schemaFilter: ['public'],
  strict: true,
  verbose: true
});
