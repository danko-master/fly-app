"use client";

import React, { useState, useRef, useEffect } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import ColorBlock from "./colorBlock";
import { Card } from "react-bootstrap";

function MapGeoJSON() {
  const geodata = useRef();
  // Признак наличия контуров
  const [isCanShowData, setIsCanShowData] = useState(false);
  // По умолчанию отображем топ 10
  const [currentStyle, setCurrentStyle] = useState("top");

  // Установка процентиля
  const [sliderValue, setSliderValue] = useState(50);
  const [procentileValue, setProcentileValue] = useState();

  // Состояние карты
  const map = useMap();

  // Данные для карты
  const datamap = useRef();
  const datamapprep = useRef();

  // Цветовая палитра
  const colors = [
    "#7d8597",
    "#4895ef",
    "#4361ee",
    "#3a0ca3",
    "#b5179e",
    "#f72585",
  ];

  const colorsTop = ["#e63946", "#457b9d", "#7d8597"];

  function getColors() {
    if (currentStyle === "perc") {
      return colors;
    } else {
      return colorsTop;
    }
  }

  //   Стиль контура
  function style(geoitem) {
    if (currentStyle === "perc") {
      // console.log(geoitem["properties"]["rus_code"]);
      // console.log(datamapprep.current[geoitem["properties"]["rus_code"]]);
      if (datamapprep.current[geoitem["properties"]["rus_code"]] === void 0) {
        // console.log(geoitem);
        return { color: colors[0] };
      } else {
        let percentage = parseFloat(
          datamapprep.current[geoitem["properties"]["rus_code"]].percentage
        );
        // console.log(percentage);
        switch (true) {
          case percentage < 1:
            return { color: colors[1], fillOpacity: 0.4, weight: 2 };
          case percentage < 6:
            return { color: colors[2], fillOpacity: 0.4, weight: 2 };
          case percentage < 11:
            return { color: colors[3], fillOpacity: 0.4, weight: 2 };
          case percentage < 16:
            return { color: colors[4], fillOpacity: 0.4, weight: 2 };
          default:
            return { color: colors[5], fillOpacity: 0.4, weight: 2 };
        }
      }
    } else if (currentStyle === "procentile") {
      if (datamapprep.current[geoitem["properties"]["rus_code"]] === void 0) {
        return { color: colorsTop[2] };
      } else {
        let count =
          datamapprep.current[geoitem["properties"]["rus_code"]].count;
        switch (true) {
          case count > procentileValue:
            return { color: colorsTop[0], fillOpacity: 0.4, weight: 2 };
          default:
            return { color: colorsTop[1], fillOpacity: 0.4, weight: 2 };
        }
      }
    } else {
      if (datamapprep.current[geoitem["properties"]["rus_code"]] === void 0) {
        return { color: colorsTop[2] };
      } else {
        let top_index =
          datamapprep.current[geoitem["properties"]["rus_code"]].top_index;
        switch (true) {
          case top_index < 11:
            return { color: colorsTop[0], fillOpacity: 0.4, weight: 2 };
          default:
            return { color: colorsTop[1], fillOpacity: 0.4, weight: 2 };
        }
      }
    }
  }

  // Текст легенды
  function legend(index) {
    if (currentStyle === "perc") {
      switch (index) {
        case 0:
          return "Данных нет";
        case 1:
          return "< 1%";
        case 2:
          return "2% - 5%";
        case 3:
          return "6% - 10%";
        case 4:
          return "11% - 15%";
        default:
          return "> 15%";
      }
    } else if (currentStyle === "procentile") {
      switch (index) {
        case 0:
          return "Выше уровня";
        case 1:
          return "Ниже уровня";
        default:
          return "Данных нет";
      }
    } else {
      switch (index) {
        case 0:
          return "Топ 10";
        case 1:
          return "Остальные";
        default:
          return "Данных нет";
      }
    }
  }

  async function fetchDataAndProcess() {
    await fetch("/api/report", {
      method: "GET",
    }).then((resp) =>
      resp.json().then((data) => {
        // console.log(data);
        datamap.current = data;
        let dataprep = {};
        Object.keys(data).forEach((key, index) => {
          dataprep[data[key]["rus_code"]] = {
            rus_name: data[key]["rus_name"],
            count: data[key]["count"],
            percentage: data[key]["percentage"],
            count_all: data[key]["count_all"],
            top_index: index + 1,
          };
        });

        datamapprep.current = dataprep;
      })
    );

    await fetch("/api/helper", {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 3600, // Кешируем на 1 час
      },
    }).then((resp) =>
      resp.json().then((data) => {
        // console.log(data);
        geodata.current = data;
        setIsCanShowData(true);
      })
    );
  }

  useEffect(() => {
    fetchDataAndProcess();
    disableDragging();
    // Первое значение процентиля при открытии страницы
    fetchProcentile(50);
  }, []);

  function disableDragging() {
    // Убираем события карты на вспомогательных элементах
    const info = window.document.getElementById("card-info");
    // Disable dragging when user's cursor enters the element
    info.addEventListener("mouseover", function () {
      map.dragging.disable();
    });

    // Re-enable dragging when user's cursor leaves the element
    info.addEventListener("mouseout", function () {
      map.dragging.enable();
    });
  }

  function popupText(feature) {
    let str = "<b>" + feature.properties.rus_name + "</b><br/>Полётов: ";
    if (datamapprep.current[feature.properties.rus_code] === void 0) {
      str = str + "данных нет";
    } else {
      str =
        str +
        datamapprep.current[feature.properties.rus_code].count +
        "<br/>" +
        datamapprep.current[feature.properties.rus_code].percentage +
        "% от общего количества";
    }
    return str;
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        // Highlight the feature on mouseover
        e.target.setStyle({
          weight: 4,
          fillOpacity: 0.7,
        });
        // Optionally, show a popup or tooltip
        if (feature.properties && feature.properties.rus_name) {
          e.target.bindPopup(popupText(feature)).openPopup();
        }
      },
      mouseout: (e) => {
        // Reset style on mouseout
        e.target.setStyle({
          weight: 2,
          fillOpacity: 0.4,
        });
        e.target.closePopup(); // Close popup if open
      },
    });
  };

  const handleOptionChange = (event) => {
    setCurrentStyle(event.target.value);
    const toggleEvent = new CustomEvent("toptoggle", {
      detail: { target: event.target.value },
    });
    document.dispatchEvent(toggleEvent);
  };

  const procentileChange = (event) => {
    const num = Number(event.target.value);
    setSliderValue(num);
    fetchProcentile(num);
  };

  async function fetchProcentile(num) {
    await fetch("/api/report?bytime=percentile&cont=" + num, {
      method: "GET",
    }).then((resp) =>
      resp.json().then((data) => {
        setProcentileValue(parseInt(data[0]["percentile"]));
      })
    );
  }

  // Отправим percentile в таблицу
  useEffect(() => {
    const event = new CustomEvent("procentile", {
      detail: { num: sliderValue, value: procentileValue },
    });
    document.dispatchEvent(event);
  }, [procentileValue]);

  return (
    <>
      {isCanShowData && (
        <React.Fragment>
          {Object.keys(geodata.current["features"]).map((key) => (
            <React.Fragment key={"geoFragment" + key}>
              <GeoJSON
                style={style(geodata.current["features"][key])}
                data={geodata.current["features"][key]}
                onEachFeature={onEachFeature}
              />
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
      <div className="float-start">
        <div className="card-info" id="card-info">
          {isCanShowData && (
            <Card>
              <Card.Body>
                <Card.Title>Российская Федерация</Card.Title>
                <Card.Text>
                  Всего полётов: {datamap.current[0]["count_all"]}
                </Card.Text>

                <div>
                  <label className="form-check-label">
                    <input
                      type="radio"
                      name="colorOptions"
                      className="form-check-input"
                      value="top"
                      checked={currentStyle === "top"}
                      onChange={handleOptionChange}
                    />
                    &nbsp;Топ 10
                  </label>
                  <span className="m-4">&nbsp;</span>
                  <label className="form-check-label">
                    <input
                      type="radio"
                      name="colorOptions"
                      className="form-check-input"
                      value="procentile"
                      checked={currentStyle === "procentile"}
                      onChange={handleOptionChange}
                    />
                    &nbsp;Процентиль
                  </label>
                  <span className="m-4">&nbsp;</span>
                  <label className="form-check-label">
                    <input
                      type="radio"
                      name="colorOptions"
                      className="form-check-input"
                      value="perc"
                      checked={currentStyle === "perc"}
                      onChange={handleOptionChange}
                    />
                    &nbsp;Проценты
                  </label>
                </div>
                {currentStyle === "procentile" && (
                  <div className="pt-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={procentileChange}
                    />
                    <p>Показатель: {sliderValue}%</p>
                    <div>Значение: {procentileValue}</div>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
      <div className="float-end">
        {getColors().map((color, index) => (
          <ColorBlock
            key={currentStyle + index}
            color={color}
            text={legend(index)}
          />
        ))}
      </div>
    </>
  );
}

export default MapGeoJSON;
