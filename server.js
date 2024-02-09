const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const apiRoutes = require("./routes/API-routes");
const htmlRoutes = require("./routes/HTML-routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Listening on PORT: ${PORT}`);
  }
});

server.on("error", (err) => {
  console.error("Server error:", err);
});