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

  public weather: WeatherResponse;
  public weatherIcon = 'thermometer';

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

    this.refresherHandler();

    this.setWeatherIcon();
  }

  async refresherHandler(event?) {
    try {
      this.weather = await this.weatherService.refreshWeather();
    } catch (err) {
      console.log(err);
    }

    this.setWeatherIcon();

    if (event) {
      event.target.complete();
    }
  }

  setWeatherIcon() {
    let description = this.weather.weather[0].description;
    if (description) {
      if (description.includes('lightning') || description.includes('thunder')){
        this.weatherIcon = 'thunderstorm';
      } else if (description.includes('wind')){
        this.weatherIcon = 'flag';
      } else if (description.includes('rain') || description.includes('shower')) {
        this.weatherIcon = 'rainy';
      } else if (description.includes('snow') || description.includes('frost')) {
        this.weatherIcon = 'snow';
      } else if (description.includes('cloud')) {
        this.weatherIcon = 'cloudy';
      } else if (description.includes('sun') || description.includes('clear')) {
        this.weatherIcon = 'sunny';
      } else {
        this.weatherIcon = 'thermometer';
      }
    }
  }

}
