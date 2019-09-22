import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private useCurrentLocation = true;
  private presetLocation = 'SanDiego';
  private unit = 'celsius';


  constructor(private settingsService: SettingsService) { }

  async ngOnInit() {
    const [location, unit] = await Promise.all([this.settingsService.getLocation(), this.settingsService.getTemperatureUnit()]);
    this.useCurrentLocation = location.useCoords;
    this.presetLocation = location.name;
    this.unit = unit;
    console.log(this.unit === 'celsius');
    console.log(this.unit);
  }

  async handleToggleLocation(useLocation){
    this.useCurrentLocation = useLocation;
    await this.settingsService.setUseCoords(this.useCurrentLocation);
  }

  async handleLocationChange(event) {
    console.log('handleLocationChange', event.detail.value);
    this.presetLocation = event.detail.value;
    await this.settingsService.setLocationName(this.presetLocation);
  }

  async handleUnitChange(unit) {
    this.unit = unit;
    await this.settingsService.setTemperatureUnit(unit);
  }

}
