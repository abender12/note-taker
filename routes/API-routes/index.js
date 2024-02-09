const router = require("express").Router();
const notesRoute = require("./noteRoute");

router.use(notesRoute);

module.exports = router;