import * as model from "../models/model.js";

export const getAll = (req, res) => {
  return res.json(model.findAll());
};

export const create = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "titre vide" });
  }

  const createCard = model.create(title);
  return res.status(201).json(createCard);
};

export const update = (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  if (status !== "todo" && status !== "doing" && status !== "done") {
    return res.status(400).json({ error: "statut invalide" });
  }

  const update = model.update(status, id);

  if (update.changes === 0) {
    return res.status(404).json({ error: "carte inexistante" });
  }

  const updateCard = model.findOneById(id);

  return res.status(200).json(updateCard);
};

export const remove = (req, res) => {
  const id = req.params.id;

  const removeCard = model.remove(id);

  if (removeCard.changes === 0) {
    return res.status(404).json({ error: "carte inexistante" });
  }

  return res.status(204).json(removeCard);
};
