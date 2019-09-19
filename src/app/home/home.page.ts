import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../interfaces/weather';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private weather: WeatherResponse;

  constructor(private settingsService: SettingsService, private weatherService: WeatherService) {
    this.weather = {
      base: '',
      clouds: null,
      cod: null,
      coord: null,
      dt: null,
      id: null,
      main: {
        humidity: null,
        pressure: null,
        temp: null,
        temp_max: null,
        temp_min: null
      },
      name: 'Loading...',
      sys: null,
      visibility: null,
      weather: [
        {
          id: null,
          main: null,
          description: null,
          icon: null
        }
      ],
      wind: null
    };
  }

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
    await this.settingsService.setCoords(coordinates.coords.latitude, coordinates.coords.longitude);
    try {
      this.weather = await this.weatherService.getCurrentWeather();

    } catch (err) {
      console.log (err);
    }
  }

  async refresherHandler(event?) {
    try {
      this.weather = await this.weatherService.refreshWeather();
    } catch (err) {
      console.log(err);
    }

    if (event) {
      event.target.complete();
    }
  }

}
