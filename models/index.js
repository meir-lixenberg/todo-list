const fs = require("fs");
const { upperFirst, camelCase, isNil } = require("lodash");
const path = require("path");
const basename = path.basename(__filename);
const mongoose = require("mongoose");

const mongooseConnect = require(path.join(
  __dirname,
  "../db",
  "connect.js"
));

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require("./" + file);
    if (upperFirst(camelCase(model.name)) !== "") {
      db[upperFirst(camelCase(model.name))] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (!isNil(db[modelName].associate)) {
    db[modelName].associate(db);
  }
});

db.mongodb = mongooseConnect;
db.Mongodb = mongoose;

module.exports = db;
