import "server-only";
import { NextResponse } from "next/server";
import db from "../../../models";

// Контуры регионов
export async function GET() {
  const results = await db.Region.findAll();
  let geojson = { features: [] };

  results.map(function (region) {
    let feature = {
      type: "Feature",
      properties: {
        rus_name: region.rus_name,
        rus_code: region.rus_code,
      },
      geometry: region.geometry_geojson,
    };
    geojson["features"].push(feature);
  });

  // Формат ответа
  // {"features": [ {
  //     "type": "Feature",
  //     "properties": {
  //       "rus_name": "Томская область",
  //       "rus_code": "70"
  //     },
  //     "geometry": {
  //       "type": "Polygon",
  //       "coordinates": ...,
  //     }
  //   }
  // ]}

  return NextResponse.json(geojson, {
    status: 200,
  });
}
