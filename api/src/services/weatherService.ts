import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  precipitation: number;
  uvIndex: number;
}

export class WeatherService {
  static async getCurrentWeather(lat: number, lng: number): Promise<WeatherData> {
    try {
      console.log(`Fetching current weather for coordinates: ${lat}, ${lng}`);
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon: lng,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });
      console.log('Current weather response:', response.data);
      const data = response.data;
      return {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        precipitation: data.rain ? data.rain['1h'] || 0 : 0,
        uvIndex: 0 // UV index requires a separate API call
      };
    } catch (error: any) {
      console.error('Error fetching current weather:', error.response?.data || error.message);
      throw error;
    }
  }

  static async getForecast(lat: number, lng: number): Promise<WeatherData[]> {
    try {
      console.log(`Fetching forecast for coordinates: ${lat}, ${lng}`);
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon: lng,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });
      console.log('Forecast response:', response.data);
      return response.data.list.map((item: any) => ({
        temperature: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        precipitation: item.rain ? item.rain['3h'] || 0 : 0,
        uvIndex: 0
      }));
    } catch (error: any) {
      console.error('Error fetching forecast:', error.response?.data || error.message);
      throw error;
    }
  }
} 