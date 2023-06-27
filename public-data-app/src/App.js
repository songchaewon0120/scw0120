import React, { useState, useContext, useEffect, useRef } from "react";
import "./App.css";
import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Dashboard from "./DashboardChaewon";

// 프로젝트에 필요한 데이터 객체를 구성한다
const seoul = [
  { siDo: 11, goGun: 680, name: "강남구" },
  { siDo: 11, goGun: 440, name: "마포구" },
  { siDo: 11, goGun: 110, name: "종로구" },
];

const years = [2018, 2019, 2020];

// 메인 컴포넌트
export default function App() {
  const [year, setYear] = useState(years[0]);
  const [city, setCity] = useState(seoul[0]);

  return (
    <>
      {/* Side Bar */}
      <nav>
        <h1>자전거 사고조회</h1>
        <section>
          <h3>서울특별시</h3>
          {seoul.map((city) => (
            <button key={city.goGun} onClick={() => setCity(city)}>
              {city.name}
            </button>
          ))}
        </section>
      </nav>

      {/* 메인 */}
      <main>
        <div id="select-year">
          <select onChange={(e) => setYear(e.target.value)}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* 대시보드에 city와 year변수를 전달한다 */}
        <Dashboard city={city} year={year} />
      </main>
    </>
  );
}
