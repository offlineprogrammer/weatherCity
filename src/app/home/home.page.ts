import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private settingsService: SettingsService) {}

  async ngOnInit(){
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
    await this.settingsService.setCoords(coordinates.coords.latitude, coordinates.coords.longitude);
  }

}
