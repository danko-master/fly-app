"use client";
export default function MapCopyLogo() {
  const yndxmps = "";
  // Убираем избыточные артефакты
  const parentElement = document.getElementsByClassName(
    "leaflet-control-attribution"
  )[0];
  if (parentElement !== void 0) {
    parentElement.innerHTML = yndxmps;
  }
}
