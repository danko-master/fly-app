"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Tabs, Tab, Card } from "react-bootstrap";
import ChartByMonth from "../chartByMonth";
import ChartByWeek from "../chartByWeek";
import ChartByDay from "../chartByDay";
import Table from "react-bootstrap/Table";

const Map = dynamic(() => import("./map.js"), {
  ssr: false,
});

export default function Home() {
  // Формат данных [12, 19, 3, 5, 2];
  const dataMonthArr = useRef([]);
  // Признак получения данных
  const [isCanShowDataMonthly, setIsCanShowDataMonthly] = useState(false);

  const dataWeekArr = useRef([]);
  // Признак получения данных
  const [isCanShowDataWeek, setIsCanShowDataWeek] = useState(false);

  const dataDayArr = useRef([]);
  // Признак получения данных
  const [isCanShowDataDay, setIsCanShowDataDay] = useState(false);

  // Данные для регионов
  const datamap = useRef();
  // Признак получения данных
  const [isCanShowDataRegions, setIsCanShowDataRegions] = useState(false);

  // Установка процентиля
  const [sliderValue, setSliderValue] = useState(50);
  const [procentileValue, setProcentileValue] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [targetVisible, setTargetVisible] = useState("top");

  async function fetchDataAndProcess() {
    await fetch("/api/report?bytime=monthly", {
      method: "GET",
    }).then((resp) =>
      resp.json().then((data) => {
        data.forEach((item, index) => {
          dataMonthArr.current.push(parseInt(item.record_count));
        });
        setIsCanShowDataMonthly(true);
      })
    );

    await fetch("/api/report?bytime=weekly", {
      method: "GET",
    }).then((resp) =>
      resp.json().then((data) => {
        data.forEach((item, index) => {
          dataWeekArr.current.push(parseInt(item.record_count));
        });
        setIsCanShowDataWeek(true);
      })
    );

    await fetch("/api/report?bytime=daily", {
      method: "GET",
    }).then((resp) =>
      resp.json().then((data) => {
        data.forEach((item, index) => {
          dataDayArr.current.push(parseInt(item.record_count));
        });
        setIsCanShowDataDay(true);
      })
    );

    await fetch("/api/report", {
      method: "GET",
    }).then((resp) =>
      resp.json().then((data) => {
        datamap.current = data;
        setIsCanShowDataRegions(true);
      })
    );
  }

  function handleLoad(event) {
    setSliderValue(event.detail.num);
    setProcentileValue(event.detail.value);
  }

  function handleToggle(event) {
    setTargetVisible(event.detail.target);
    if (event.detail.target === "procentile") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    fetchDataAndProcess();

    // Add event listener
    document.addEventListener("procentile", handleLoad);
    document.addEventListener("toptoggle", handleToggle);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("procentile", handleToggle);
      document.removeEventListener("toptoggle", handleToggle);
    };
  }, []);

  // Цветовая палитра для процентов
  const colors = [
    "#7d8597",
    "#4895ef",
    "#4361ee",
    "#3a0ca3",
    "#b5179e",
    "#f72585",
  ];

  const colorsTop = ["#e63946", "#457b9d", "#7d8597"];

  function getColor(rec, top_index) {
    if (targetVisible === "perc") {
      switch (true) {
        case rec.percentage < 1:
          return colors[1];
        case rec.percentage < 6:
          return colors[2];
        case rec.percentage < 11:
          return colors[3];
        case rec.percentage < 16:
          return colors[4];
        default:
          return colors[5];
      }
    } else if (targetVisible === "procentile") {
      switch (true) {
        case rec.count > procentileValue:
          return colorsTop[0];
        default:
          return colorsTop[1];
      }
    } else {
      switch (true) {
        case top_index < 11:
          return colorsTop[0];
        default:
          return colorsTop[1];
      }
    }
  }

  return (
    <>
      <Head>
        <title>Данные по полётам на карте России</title>
      </Head>
      <Map />
      <Card id="repcard">
        <Card.Body>
          <Tabs defaultActiveKey="regions" className="mb-3">
            <Tab eventKey="month" title="По месяцам">
              {isCanShowDataMonthly && (
                <React.Fragment>
                  <ChartByMonth data={dataMonthArr.current} />
                </React.Fragment>
              )}
            </Tab>
            <Tab eventKey="week" title="По неделям">
              {isCanShowDataWeek && (
                <React.Fragment>
                  <ChartByWeek data={dataWeekArr.current} />
                </React.Fragment>
              )}
            </Tab>
            <Tab eventKey="day" title="По дням">
              {isCanShowDataDay && (
                <React.Fragment>
                  <ChartByDay data={dataDayArr.current} />
                </React.Fragment>
              )}
            </Tab>
            <Tab eventKey="regions" title="По регионам">
              {isCanShowDataRegions && (
                <React.Fragment>
                  {!isVisible && (
                    <React.Fragment>
                      <div className="top10-color">
                        <h3>Топ 10</h3>
                        <Table hover>
                          <thead>
                            <tr>
                              <th colSpan="2">#</th>
                              <th>Регион</th>
                              <th>Количество полётов</th>
                              <th>% от общего количества</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datamap.current.map(
                              (rec, index) =>
                                index < 10 && (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <div
                                        style={{
                                          backgroundColor: getColor(
                                            rec,
                                            index + 1
                                          ),
                                        }}
                                      >
                                        &nbsp;
                                      </div>
                                    </td>
                                    <td>{rec.rus_name}</td>
                                    <td>{rec.count}</td>
                                    <td>{rec.percentage}</td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </Table>
                      </div>
                      <div className="other-color">
                        <h4>Остальные регионы</h4>
                        <Table striped hover>
                          <thead>
                            <tr>
                              <th colSpan="2">#</th>
                              <th>Регион</th>
                              <th>Количество полётов</th>
                              <th>% от общего количества</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datamap.current.map(
                              (rec, index) =>
                                index > 9 && (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <div
                                        style={{
                                          backgroundColor: getColor(
                                            rec,
                                            index + 1
                                          ),
                                        }}
                                      >
                                        &nbsp;
                                      </div>
                                    </td>
                                    <td>{rec.rus_name}</td>
                                    <td>{rec.count}</td>
                                    <td>{rec.percentage}</td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </React.Fragment>
                  )}
                  {isVisible && (
                    <React.Fragment>
                      <div className="top10-color">
                        <h5>
                          Количество полётов выше уровня {procentileValue}
                        </h5>
                        <h6>{sliderValue}-й процентиль</h6>
                        <Table hover>
                          <thead>
                            <tr>
                              <th colSpan="2">#</th>
                              <th>Регион</th>
                              <th>Количество полётов</th>
                              <th>% от общего количества</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datamap.current.map(
                              (rec, index) =>
                                rec.count > procentileValue && (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <div
                                        style={{
                                          backgroundColor: getColor(
                                            rec,
                                            index + 1
                                          ),
                                        }}
                                      >
                                        &nbsp;
                                      </div>
                                    </td>
                                    <td>{rec.rus_name}</td>
                                    <td>{rec.count}</td>
                                    <td>{rec.percentage}</td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </Table>
                      </div>
                      <div className="other-color">
                        <h5>
                          Количество полётов ниже уровня {procentileValue}
                        </h5>
                        <h6>{sliderValue}-й процентиль</h6>
                        <Table striped hover>
                          <thead>
                            <tr>
                              <th colSpan="2">#</th>
                              <th>Регион</th>
                              <th>Количество полётов</th>
                              <th>% от общего количества</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datamap.current.map(
                              (rec, index) =>
                                rec.count <= procentileValue && (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <div
                                        style={{
                                          backgroundColor: getColor(
                                            rec,
                                            index + 1
                                          ),
                                        }}
                                      >
                                        &nbsp;
                                      </div>
                                    </td>
                                    <td>{rec.rus_name}</td>
                                    <td>{rec.count}</td>
                                    <td>{rec.percentage}</td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
}
