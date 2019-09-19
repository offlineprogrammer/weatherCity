import { Injectable } from '@angular/core';
import { WeatherResponse } from '../interfaces/weather';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public data: WeatherResponse;
  private apiKey = '';

  constructor(private settingsService: SettingsService) { }

  async load() {
    if (this.data){
      return this.data;
    } else {
      return await this.refreshWeather();
    }
  }

  async refreshWeather() {
    const [location, unit] = await Promise.all ([
      this.settingsService.getLocation(),
      this.settingsService.getTemperatureUnit()
    ]);
    let response: Response;
    try {
      if (location.useCoords) {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?
        lat=${location.lat}&lon=${
        location.lng
        }&APPID=${this.apiKey}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } else {
        response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?
          q=${location.name}&APPID=${this.apiKey}`
          );
        if (!response.ok) {
            throw new Error(response.statusText);
          }
      }


    } catch (err) {
      return Promise.reject(err);
    }
    const weatherData = await response.json();
    return this.processData(weatherData, unit);
  }

  processData (data: WeatherResponse, unit: string) {
    data.main.temp = parseFloat(this.convertFromKelvin(data.main.temp, unit).toFixed(1));
    data.main.temp_min = parseFloat(this.convertFromKelvin(data.main.temp_min, unit).toFixed(1));
    data.main.temp_max = parseFloat(this.convertFromKelvin(data.main.temp_max, unit).toFixed(1));
    return (this.data = data);
  }

  async getCurrentWeather() {
    const data = await this.load();
    return data;
  }

  convertFromKelvin(amount: number, unit: string): number {
    if (unit === 'celsius'){
      return amount - 273.15;
    } else if (unit === 'fahrenheit') {
      return (amount - 273.15) * 1.8 + 32;
    } else {
      return amount;
    }
  }
}
