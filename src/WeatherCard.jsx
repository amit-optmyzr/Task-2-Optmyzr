import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchWeatherData } from "./fetchData";
import Result from "./Result";
import { convertToF } from './genericOps';

export default function WeatherCard({ identifier, handleDelete, unit, data, setWeatherData }) {
  const [cityVal, setCityVal] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  
  console.log(data);
  let temp = {
    now: data.temperature,
    max: data.max_temp,
    min: data.min_temp,
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
          onClick={() => {
            let id = data.id;
            if (cityVal !== "") fetchWeatherData(id, cityVal, setLoading, setLoad, setWeatherData);
          }}
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
        {loading && <>Loading...</>}
        {!loading && !load &&  <>Searching...</>}
        {!loading && data.name!==null && load && (
          <Result weatherData={data} temp={temp} unit={unit} />
        )}
      </div>
    </div>
  );
}
