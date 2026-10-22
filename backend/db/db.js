import Database from "better-sqlite3";

const db = new Database("kanban.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
   id INTEGER PRIMARY KEY AUTOINCREMENT, 
   title TEXT NOT NULL, 
   status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done')),
   created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
`);

export default db;
