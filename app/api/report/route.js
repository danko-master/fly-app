import "server-only";
import { NextResponse } from "next/server";
import db from "../../../models";
import { Sequelize, QueryTypes } from "sequelize";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const byTime = searchParams.get("bytime");
    let data = await getData(byTime, searchParams);

    // console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error generating URL:", error);
    return NextResponse.json(
      { error: "Failed to generate URL" },
      { status: 500 }
    );
  }
}

async function getData(byTime, searchParams) {
  let sql;

  switch (byTime) {
    case null:
    case void 0:
      // return await db.Flight.findAndCountAll({
      //   group: ["region_id"],
      // });
      sql = `select region_id, count(region_id) as count, rus_code, rus_name, 
      (SELECT COUNT(1) FROM flights) as count_all, 
      ROUND((COUNT(1)::numeric / (SELECT COUNT(1) FROM flights)::numeric) * 100, 2) AS percentage
      from flights inner join regions on regions.id = flights.region_id 
      group by region_id, rus_code, rus_name order by count desc;`;
      return await db.resequelize.query(sql, {
        type: QueryTypes.SELECT,
      });
    case "percentile":
      const cont = parseInt(searchParams.get("cont")) / 100;
      sql =
        `SELECT PERCENTILE_CONT(` +
        cont +
        `) WITHIN GROUP (ORDER BY item_count) AS percentile
FROM (
    SELECT COUNT(region_id) AS item_count
    FROM flights
    GROUP BY region_id
) AS counts_per_region_id;
`;
      return await db.resequelize.query(sql, {
        type: QueryTypes.SELECT,
      });
    case "monthly":
      sql = `SELECT
  time_bucket('1 month', event_date) AS month_start,
  COUNT(1) AS record_count
FROM
  flights
GROUP BY
  month_start
ORDER BY
  month_start;`;
      return await db.resequelize.query(sql, {
        type: QueryTypes.SELECT,
      });
    case "weekly":
      sql = `SELECT
    time_bucket('1 week', event_date) AS week_start,
    COUNT(1) AS record_count
FROM
    flights
GROUP BY
    week_start
ORDER BY
    week_start;`;
      return await db.resequelize.query(sql, {
        type: QueryTypes.SELECT,
      });
    case "daily":
      sql = `SELECT
    time_bucket('1 day', event_date) AS day_start,
    COUNT(1) AS record_count
FROM
    flights
GROUP BY
    day_start
ORDER BY
    day_start;`;
      return await db.resequelize.query(sql, {
        type: QueryTypes.SELECT,
      });
  }
}
