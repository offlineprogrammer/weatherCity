import { StorageService} from './storage.service';
import { Location } from '../interfaces/location';
import { Injectable } from '@angular/core';


const TEMPERATURE_UNIT_KEY = 'weatherTemperatureUnit';
const LOCATION_KEY = 'weatherUserLocation';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private defaultLocation: Location = {
    lat: null,
    lng: null,
    name: 'San Diego',
    useCoords: true
  };

  constructor(private storageService: StorageService) { }

  async getTemperatureUnit(): Promise<string> {
    return (await this.storageService.get(TEMPERATURE_UNIT_KEY)) || 'celsius';
  }

  async setTemperatureUnit(unit: string): Promise<void> {
    await this.storageService.save(TEMPERATURE_UNIT_KEY, unit);
  }

  async getLocation(): Promise<Location> {
    return (await this.storageService.get(LOCATION_KEY)) || this.defaultLocation;
  }

  async setLocationName(name: string): Promise<void> {
    const location = (await this.getLocation()) || this.defaultLocation;
    location.name = name;
    return this.storageService.save(LOCATION_KEY, location);
  }

  async setCoords(lat: number, lng: number): Promise<void> {
    const location = (await this.getLocation()) || this.defaultLocation;
    location.lat = lat;
    location.lng = lng;
    return this.storageService.save(LOCATION_KEY, location);
  }

  async setUseCoords(flag: boolean): Promise<void> {
    const location = (await this.getLocation()) || this.defaultLocation;
    location.useCoords = flag;
    return this.storageService.save(LOCATION_KEY, location);
  }

}
