import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { PlacesService } from '../services/places.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public useCurrentLocation = true;
  public presetLocation = 'SanDiego';
  public unit = 'celsius';
  public isCityAvailable = false;
  public predictionsItems: any;
  public googleImg = 'assets/imgs/powered_by_google_on_white.png';


  constructor(private settingsService: SettingsService, private placesService: PlacesService, private analytics: AnalyticsService) { }

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
    this.analytics.trackEvent('User', 'Set Location', this.presetLocation);
    await this.settingsService.setLocationName(this.presetLocation);
  }

  async handleUnitChange(unit) {
    this.unit = unit;
    console.log(this.unit);
    this.analytics.trackEvent('User', 'Unit Change', unit);
    await this.settingsService.setTemperatureUnit(this.unit);
  }

  async getCities(event) {
    console.log('getCities', event.target.value);
    const cities = await this.placesService.getPlaces(event.target.value);
    console.log(cities);
    this.isCityAvailable = true;
    this.predictionsItems = cities;
  }

  selectCity(item) {
    console.log(item);
    this.analytics.trackEvent('User', 'Select City', item.description);
    this.isCityAvailable = false;
    this.presetLocation = item.structured_formatting.main_text + ',' + item.structured_formatting.secondary_text;
  }

}
