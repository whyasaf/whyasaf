import { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain, Snowflake, AlertCircle } from "lucide-react";

interface WeatherData {
  temp: number | string;
  code: number;
  city: string;
  timestamp: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: "--",
    code: 0,
    city: "İstanbul",
    timestamp: 0,
  });

  const getWeatherIcon = (code: number) => {
    const size = 15;
    const className = "text-zinc-400";
    if (code === 0) return <Sun size={size} className={className} />;
    if (code >= 1 && code <= 3) return <Cloud size={size} className={className} />;
    if (code >= 51 && code <= 67) return <CloudRain size={size} className={className} />;
    if (code >= 71 && code <= 77) return <Snowflake size={size} className={className} />;
    return <Cloud size={size} className={className} />;
  };

  useEffect(() => {
    const fetchWeatherAndCity = (lat: number, lon: number, forcedCity: string | null = null) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then((r) => r.json())
        .then((weatherData) => {
          const temp = Math.round(weatherData.current_weather.temperature);
          const code = weatherData.current_weather.weathercode;
          if (forcedCity) {
            saveToCache(temp, code, forcedCity);
          } else {
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=tr`)
              .then((res) => res.json())
              .then((cityData) => {
                const city = cityData.city || cityData.locality || "İstanbul";
                saveToCache(temp, code, city);
              })
              .catch(() => saveToCache(temp, code, "İstanbul"));
          }
        })
        .catch(() => {
          setWeather({ temp: "--", code: 0, city: forcedCity || "İstanbul", timestamp: Date.now() });
        });
    };

    const saveToCache = (temp: number, code: number, city: string) => {
      const data: WeatherData = {
        temp,
        code,
        city,
        timestamp: Date.now(),
      };
      localStorage.setItem("weatherCache", JSON.stringify(data));
      setWeather(data);
    };

    const cachedData = localStorage.getItem("weatherCache");
    let useCache = false;

    if (cachedData) {
      try {
        const parsedData: WeatherData = JSON.parse(cachedData);
        const oneHour = 60 * 60 * 1000;
        if (Date.now() - parsedData.timestamp < oneHour) {
          setWeather(parsedData);
          useCache = true;
        }
      } catch (e) {
        console.error("Weather cache parsing failed", e);
      }
    }

    if (!useCache) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherAndCity(position.coords.latitude, position.coords.longitude);
          },
          () => {
            fetchWeatherAndCity(41.0082, 28.9784, "İstanbul");
          }
        );
      } else {
        fetchWeatherAndCity(41.0082, 28.9784, "İstanbul");
      }
    }
  }, []);

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400 font-medium select-none cursor-default hover:border-zinc-700 transition-colors">
      {getWeatherIcon(weather.code)}
      <span>
        {weather.city} {weather.temp}°C
      </span>
    </div>
  );
}
