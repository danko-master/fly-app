const Sequelize = require("sequelize");
// console.log('config')
// console.log(process.env.SAPR_URL)
// console.log(process.env.NODE_ENV)

const env = process.env.NODE_ENV || "development";
const config = require("./config.js")[env];

let sequelize;
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = sequelize;
