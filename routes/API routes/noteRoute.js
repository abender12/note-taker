const router = require("express").Router();
let data = require("../../db/db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// GET /api/notes
router.get("/notes", (req, res) => {
  console.log({ data });
  res.json(data);
});

// DELETE /api/notes/:id
// get one specific note and find entry that matches
router.delete("/notes/:id", (req, res) => {
  // rewrite data and return only elements that do not match deleted note
  data = data.filter((el) => el.id !== req.params.id);
  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(data),
    function (err) {
      if (err) {
        res.status(404).json({ error: err });
      }
      res.json(data);
    }
  );
});

// POST /api/notes
//   create new UUID, take note out of req.body, apply UUID, save to db.json
router.post("/notes", (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  console.log(newNote);
  console.log(req.body);
  data.unshift(newNote);
  // joins relative to absolute path
  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(data),
    function (err) {
      if (err) {
        res.status(404).json({ error: err });
      }
      res.json(data);
    }
  );
});

module.exports = router;