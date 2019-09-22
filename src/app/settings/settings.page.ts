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
    console.log('unit', this.unit);
    console.log('presetLocation', this.presetLocation);
    console.log('useCurrentLocation', this.useCurrentLocation);
  }

  async handleToggleLocation(useLocation){
    this.useCurrentLocation = useLocation;
    console.log(this.useCurrentLocation);
    await this.settingsService.setUseCoords(this.useCurrentLocation);
  }

  async handleLocationChange(event) {
    console.log('handleLocationChange', event.detail.value);
    this.presetLocation = event.detail.value;
    console.log(this.presetLocation);
    await this.settingsService.setLocationName(this.presetLocation);
  }

  async handleUnitChange(unit) {
    this.unit = unit;
    console.log(this.unit);
    await this.settingsService.setTemperatureUnit(this.unit);
  }

}
