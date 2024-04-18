import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { TiPlus } from "react-icons/ti";

export default function App() {
  const [city, setCity] = useState([]);
  const [unit, setUnit] = useState("c");
  const handleClick = () => {
    setCity((prev) => {
      const newId = Math.random();
      return [...prev, newId];
    });
  };
  useEffect(()=>{
    handleClick();
  }, []);
  const handleDelete = (id) => {
    setCity((prev) => prev.filter((cid) => cid !== id));
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
        {city.length===0 && <div style={{marginTop: '10px'}}>Add a card using the add icon in the right-bottom corner..</div>}
        {city.length!==0 && city.map((id, index) => {
          return (
            <WeatherCard key={id} handleDelete={handleDelete} identifier={id} unit={unit} />
          );
        })}
        <button className="add-btn" onClick={handleClick}><TiPlus /></button>
      </div>
    </main>
  );
}
