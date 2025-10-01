import sequelize from "../config/database";
import resequelize from "../config/report_database";
import Xlsxfile from "./xlsxfile.js";
import Flight from "./flight.js";
import Region from "./region.js";

// import { Sequelize } from "sequelize";

const db = {};
db.sequelize = sequelize;
db.resequelize = resequelize;
// db.Sequelize = Sequelize; // Access to Sequelize library
db.Xlsxfile = Xlsxfile;
db.Flight = Flight;
db.Region = Region;

// Define associations here if you have multiple models
// e.g., db.User.hasMany(db.Post);

// Sync database (only for development or small projects)
// sequelize.sync();

export default db;
