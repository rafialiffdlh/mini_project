import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRY = process.env.JWT_EXPIRY || 3600;

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_NAME = process.env.DB_NAME || "mini-project";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASS = process.env.DB_PASS || "passsword";

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
