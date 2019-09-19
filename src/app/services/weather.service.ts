import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

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
