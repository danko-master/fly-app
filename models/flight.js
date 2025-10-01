"use strict";

import { DataTypes } from "sequelize";
import resequelize from "../config/report_database";

const Flight = resequelize.define("flights", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  region_id: DataTypes.INTEGER,
  orvd_id: DataTypes.INTEGER,
  xlsxfile_uuid: DataTypes.UUID,
  // coords_postgis: {
  //   type: DataTypes.GEOMETRY("POINT"),
  //   allowNull: false,
  // },
  event_date: DataTypes.DATE,
});

export default Flight;
