const mongoose = require("mongoose");

const config = require("../config/config");

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = config;

async function mongooseConnect() {
  try {
    await mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    console.log("mongodb connect success");
  } catch (error) {
    throw error
  }
}

module.exports = mongooseConnect;
