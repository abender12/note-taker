const router = require("express").Router();
const data = require("../../Develop/db/db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// GET /api/notes
router.get("/notes", (req, res) => {
  console.log({ data });
  res.json(data);
});

// DELETE /api/notes/:id
router.delete("/notes/:id", (req, res) => {
  // rewrite data and return only elements that do not match deleted note
  const newData = data.filter((el) => el.id !== req.params.id);
  fs.writeFile(
    path.resolve(__dirname, "../../Develop/db/db.json"),
    JSON.stringify(newData),
    (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(newData);
      }
    }
  );
});

// POST /api/notes
router.post("/notes", (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  console.log(newNote);
  console.log(req.body);
  const newData = [newNote, ...data];
  fs.writeFile(
    path.resolve(__dirname, "../../Develop/db/db.json"),
    JSON.stringify(newData),
    (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(newData);
      }
    }
  );
});

module.exports = router;