import Database from "better-sqlite3";
import fs from 'fs';
import path from 'path';

const db = new Database(':memory:');

const schema = fs.readFileSync(path.join(process.cwd(), 'sql/schema.sql'), 'utf-8');
db.exec(schema);

export default db;

// install relevant packages for access sqlite DB
// import mysql from 'mysql2/promise';

// export const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });