import { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchWeatherData } from "./fetchData";
import Result from "./Result";

export default function WeatherCard({ identifier, handleDelete, unit }) {
  const [weatherData, setWeatherData] = useState({
    max_temp: null,
    min_temp: null,
    temperature: null,
    description: null,
    icon: null,
  });
  const [cityVal, setCityVal] = useState("");
  const [cityName, setCityName] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cityName !== "") fetchWeatherData(cityName, setLoading, setLoad, setWeatherData);
  }, [cityName]);
  const convertToF = (tmp) => ((tmp - 273.15) * 9) / 5 + 32;
  let temp = {
    now: weatherData.temperature,
    max: weatherData.max_temp,
    min: weatherData.min_temp,
  };
  if (unit === "c") {
    temp.now = temp.now - 273.15;
    temp.max = temp.max - 273.15;
    temp.min = temp.min - 273.15;
  }
  if (unit === "f") {
    temp.now = convertToF(temp.now);
    temp.max = convertToF(temp.max);
    temp.min = convertToF(temp.min);
  }
  return (
    <div className="card">
      <div className="input-section">
        <input
          type="text"
          value={cityVal}
          className="inputBox"
          placeholder="Location..."
          onChange={(e) => setCityVal(e.target.value)}
        />
        <button
          className="btn btn-success"
          onClick={() => setCityName(cityVal)}
        >
          <TiTick className="btn-icon" />
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(identifier)}
        >
          <RiDeleteBin6Line className="btn-icon" />
        </button>
      </div>
      <div className="result-section">
        <div className="location">
          {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
        </div>
        {loading && <>Loading...</>}
        {!loading && cityName === "" && <>Enter any location..</>}
        {!loading && cityName !== "" && !load && <>Data not found</>}
        {!loading && cityName !== "" && load && (
          <Result weatherData={weatherData} temp={temp} unit={unit} />
        )}
      </div>
    </div>
  );
}
