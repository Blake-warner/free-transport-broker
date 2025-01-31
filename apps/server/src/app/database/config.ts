import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: process.env.DATABASE_TYPE || "mysql",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER_NAME || "root",
  password: process.env.DATABASE_PASSWORD || "root",
  name: process.env.DATABASE_NAME || "ftb",
}));