// if (process.env.DOTENVCONFIG === "disable") {
//   // Только для dev режима, в проде см.docker-compose
//   require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
// }
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectModule: require("pg"),
  },
  test: {},
  preprod: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectModule: require("pg"),
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectModule: require("pg"),
  },
  report_development: {
    username: process.env.REPORT_DB_USER,
    password: process.env.REPORT_DB_PASSWORD,
    database: process.env.REPORT_DB_NAME,
    host: process.env.REPORT_DB_HOST,
    port: process.env.REPORT_DB_PORT,
    dialect: "postgres",
    dialectModule: require("pg"),
  },
  report_test: {},
  report_preprod: {
    username: process.env.REPORT_DB_USER,
    password: process.env.REPORT_DB_PASSWORD,
    database: process.env.REPORT_DB_NAME,
    host: process.env.REPORT_DB_HOST,
    port: process.env.REPORT_DB_PORT,
    dialect: "postgres",
    dialectModule: require("pg"),
  },
  report_production: {
    username: process.env.REPORT_DB_USER,
    password: process.env.REPORT_DB_PASSWORD,
    database: process.env.REPORT_DB_NAME,
    host: process.env.REPORT_DB_HOST,
    port: process.env.REPORT_DB_PORT,
    dialect: "postgres",
    dialectModule: require("pg"),
  },
};
