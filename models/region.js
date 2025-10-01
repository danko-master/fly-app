"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../config/report_database";

const Region = sequelize.define(
  "regions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rus_code: DataTypes.INTEGER,
    rus_name: DataTypes.STRING,
    geometry_geojson: DataTypes.JSONB,
    geometry_postgis: {
      type: DataTypes.GEOMETRY("POLYGON"),
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

export default Region;
