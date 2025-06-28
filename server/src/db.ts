import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { readFileSync } from 'fs';
import path from 'path';

export let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDB() {
  db = await open({
    filename: path.resolve('data/app.sqlite'),
    driver: sqlite3.Database,
  });

  const schema = readFileSync(path.resolve(__dirname, '../src/schema.sql'), 'utf-8');
  await db.exec(schema);
}