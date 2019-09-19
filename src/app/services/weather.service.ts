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

  async load() {}

  async refreshWeather() {}

  processData (data: WeatherResponse, unit: string) {}

  async getCurrentWeather() {}

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
