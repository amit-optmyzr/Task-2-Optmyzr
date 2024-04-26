const API_KEY = "e70ef23b1712076b76b6018202d93967";

const fetchWeatherData = async (
  id,
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
    setWeatherData(prevState => {
      let objIndex = prevState.findIndex(obj => obj.id===id);
      console.log(objIndex);
      prevState[objIndex].name= data.name;
      prevState[objIndex].max_temp= data.main.temp_max;
      prevState[objIndex].min_temp= data.main.temp_min;
      prevState[objIndex].temperature= data.main.temp;
      prevState[objIndex].description= data.weather[0].description;
      prevState[objIndex].icon= data.weather[0].icon;
      setLoad(true);
      setLoading(false);
      return prevState;
    });
    } catch (error) {
      setLoad(false);
      setLoading(false);
    }
};


export { fetchWeatherData };
