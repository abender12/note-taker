// Connect to require, express, and Heroku 
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
// Add middleware -- routes for apiRoutes and htmlRoutes
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// Parse data if it comes through urlencoded, json, or static
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Use the routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// Listen at port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));