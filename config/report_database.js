const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config.js")["report_" + env];

let resequelize;
resequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = resequelize;
