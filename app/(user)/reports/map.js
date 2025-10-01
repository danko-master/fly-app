"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leafletCustom.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import MapCopyLogo from "./mapCopyLogo.js";
import MapGeoJSON from "./mapGeoJSON";

export default function Map() {
  // Стартовый центр
  let defaultCenter = { lat: 66.25, lng: 94.15 };

  useEffect(() => {
    MapCopyLogo();
  }, []);

  const [center, setCenter] = useState(defaultCenter);
  const mapRef = useRef();

  return (
    <>
      <MapContainer
        center={center}
        zoom={process.env.NEXT_PUBLIC_MAP_STAT_ZOOM_LEVEL}
        ref={mapRef}
        zoomControl={false}
        className="map-container-style"
      >
        <ZoomControl position="bottomright" />

        <MapGeoJSON />
      </MapContainer>
    </>
  );
}
