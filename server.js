require("./config/config");

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const connect = require("./db/connect");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "100mb" }));
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
