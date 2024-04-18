const API_KEY = "e70ef23b1712076b76b6018202d93967";

const fetchWeatherData = async (
  cityName,
  setLoading,
  setLoad,
  setWeatherData
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    );

    if (!response.ok) {
      console.log("hello");
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    setWeatherData({
      max_temp: data.main.temp_max,
      min_temp: data.main.temp_min,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
    setLoad(true);
    setLoading(false);
  } catch (error) {
    setLoad(false);
    setLoading(false);
  }
};


export { fetchWeatherData };
