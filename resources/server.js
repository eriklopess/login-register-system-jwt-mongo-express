const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

mongoose
  .connect(CONNECTION_STRING, {
    useNewURlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB: Connected");
    app.emit("DB_CONNECTED");
    return;
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.on("DB_CONNECTED", () => {
  app.listen(PORT, () => {
    console.log("listening in: " + PORT);
  });
});
