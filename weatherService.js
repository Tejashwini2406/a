import axios from 'axios';
import { getCachedData, cacheData } from '../utils/helpers';

const API_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (latitude, longitude) => {
  const cacheKey = `weather-${latitude}-${longitude}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_80m,wind_direction_80m',
        hourly: 'temperature_2m,precipitation_probability,rain,weather_code',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum',
        timezone: 'Asia/Kolkata',
        forecast_days: 7
      }
    });

    const weatherData = parseWeatherResponse(response.data);
    cacheData(cacheKey, weatherData, 10);
    return weatherData;
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};

const parseWeatherResponse = (data) => {
  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;

  return {
    current: {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      apparentTemperature: current.apparent_temperature,
      precipitation: current.precipitation,
      windSpeed: current.wind_speed_80m,
      windDirection: current.wind_direction_80m
    },
    hourly: {
      time: hourly.time.map(t => new Date(t * 1000)),
      temperature: hourly.temperature_2m,
      precipitation: hourly.precipitation,
      precipitationProbability: hourly.precipitation_probability
    },
    daily: {
      time: daily.time.map(t => new Date(t)),
      maxTemperature: daily.temperature_2m_max,
      minTemperature: daily.temperature_2m_min,
      precipitation: daily.precipitation_sum
    }
  };
};