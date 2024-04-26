import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { TiPlus } from "react-icons/ti";

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [unit, setUnit] = useState("c");
  const handleClick = () => {
    setWeatherData((prev) => {
      const newId = Math.random();
      return [...prev, {
        id: newId,
        name: null,
        max_temp: null,
        min_temp: null,
        temperature: null,
        description: null,
        icon: null,
      }];
    });
  };
  useEffect(()=>{
    handleClick();
  }, []);
  const handleDelete = (id) => {
    setWeatherData((prev) => prev.filter((cid) => cid.id !== id));
  };
  return (
    <main className="main">
      <header className="header">Weather App</header>
      <div style={{marginBottom: '10px', color: 'white'}}>SELECT THE UNIT</div>
      <select className="dropdown-menu" onChange={(e) => setUnit(e.target.value)}>
        <option value="c">Celcius</option>
        <option value="f">Fehrenheit</option>
        <option value="k">Kelvin</option>
      </select>
      <div className="cards">
        {weatherData.length===0 && <div style={{marginTop: '10px'}}>Add a card using the add icon in the right-bottom corner..</div>}
        {weatherData.length!==0 && weatherData.map((data, index) => {
          return (
            <WeatherCard key={data.id} handleDelete={handleDelete} identifier={data.id} unit={unit} data={data} setWeatherData={setWeatherData} />
          );
        })}
        <button className="add-btn" onClick={handleClick}><TiPlus /></button>
      </div>
    </main>
  );
}
