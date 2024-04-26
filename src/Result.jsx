export default function Result ({weatherData, temp, unit}) {
  console.log(weatherData);
    return <>
    <div className="location">
          {weatherData.name.charAt(0).toUpperCase() + weatherData.name.slice(1)}
        </div>
    <img
      src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
      alt="weather icon"
      className="weather-img"
    />
    <div className="description">
      {weatherData.description.charAt(0).toUpperCase() +
        weatherData.description.slice(1)}
    </div>
    <div className="temp-section">
      <div className="temp curr-temp">
        <p>
          {temp.now.toFixed(1)}
          {unit === "k" && "K"}
          {unit === "c" && "\u00B0C"}
          {unit === "f" && "\u00B0F"}
        </p>
        <div className="abt-temp">NOW</div>
      </div>
      <div className="temp min-temp">
        <p>
          {temp.min.toFixed(1)}
          {unit === "k" && "K"}
          {unit === "c" && "\u00B0C"}
          {unit === "f" && "\u00B0F"}
        </p>
        <div className="abt-temp">MIN</div>
      </div>
      <div className="temp max-temp">
        <p>
          {temp.max.toFixed(1)}
          {unit === "k" && "K"}
          {unit === "c" && "\u00B0C"}
          {unit === "f" && "\u00B0F"}
        </p>
        <div className="abt-temp">MAX</div>
      </div>
    </div>
  </>;
}