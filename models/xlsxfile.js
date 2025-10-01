"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Xlsxfile = sequelize.define("xlsxfiles", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: DataTypes.UUID,
  statusCode: DataTypes.STRING,
  bucket: DataTypes.STRING,
  originalName: DataTypes.STRING,
  originalSize: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export default Xlsxfile;
