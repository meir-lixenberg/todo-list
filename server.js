require("./config/config");

const express = require("express");

const app = express();
const router = require("./routes");
const connect = require("./db/connect");
const port = process.env.PORT || 3000;

app.use("/", router);

connect()
  .then(() => {
    app.listen(port, (err) => {
      if (err) throw err;

      console.log(
        `todo-list server listening on port http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    throw err;
  });
