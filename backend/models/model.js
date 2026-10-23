import db from "../db/db.js";

export const findAll = () => db.prepare("SELECT * FROM cards").all();

export const findOneById = (id) =>
  db.prepare("SELECT * FROM cards WHERE id = ?").get(id);

export const create = (title) =>
  db.prepare("INSERT INTO cards (title) VALUES (?)").run(title);

export const update = (status, id) =>
  db.prepare("UPDATE cards SET status = ? WHERE id = ? ").run(status, id);

export const remove = (id) =>
  db.prepare("DELETE FROM cards WHERE id = ?").run(id);
