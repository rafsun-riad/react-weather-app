import { useState, useEffect } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { BiWind } from 'react-icons/bi';
import { LuWaves } from 'react-icons/lu';
import { HiSun } from 'react-icons/hi';
import { PiCloudSunFill } from 'react-icons/pi';

const API_KEY = 'c10c05476a9e67c08cf4416c454f1c04';
//   'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API_KEY}'

function WeatherCart() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState(false);

  const hasCity = city.length > 0;

  useEffect(() => {
    if (!city && !search) return;

    try {
      async function fetChWeatherData() {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeatherData(data);
        setSearch(true);
      }
      fetChWeatherData();
    } catch (error) {
      console.log('Error fetching weather data', error);
      setWeatherData(null);
      setSearch(false);
    }
  }, [city, search]);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-10 p-2 w-[400px] h-[320px] pt-4">
      <div className="flex flex-row justify-between items-center bg-white rounded-2xl pl-2 pr-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-2xl outline-none p-2"
          placeholder="Enter City Name"
        />
        <button onClick={() => setCity(city)}>
          <FaSearchLocation />
        </button>
      </div>
      {search && hasCity && (
        <div>
          {weatherData ? (
            <div className="text-white">
              <div className="flex flex-col items-center text-5xl mt-5">
                {(weatherData?.main?.temp - 273.15)?.toFixed(2)}°C
              </div>

              <div className="flex flex-col items-center mt-4">
                {weatherData?.name}
              </div>

              <div className="flex flex-row justify-between mt-10 text-xl">
                <div className="flex flex-row items-center gap-x-3">
                  <BiWind />
                  <p>{(weatherData?.wind?.speed * 3.6)?.toFixed(2)} kmph</p>
                </div>
                <div className="flex flex-row items-center gap-x-3">
                  <LuWaves />
                  <p>{weatherData?.main?.humidity?.toFixed(2)} g.m-3</p>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-4 text-xl">
                <div className="flex flex-row items-center gap-x-3">
                  <HiSun />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunrise * 1000
                    )?.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-3">
                  <PiCloudSunFill />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunset * 1000
                    )?.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>Weather Data Not Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherCart;
