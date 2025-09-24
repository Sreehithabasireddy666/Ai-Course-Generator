// configs/db.jsx
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Debug: Check what environment variables are available
console.log('NEXT_PUBLIC_DB_CONNECTION_STRING:', process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);
console.log('NODE_ENV:', process.env.NODE_ENV);

// For now, let's hardcode it to match your drizzle config
const connectionString = process.env.NEXT_PUBLIC_DB_CONNECTION_STRING 

const sql = neon(connectionString);
export const db = drizzle(sql);