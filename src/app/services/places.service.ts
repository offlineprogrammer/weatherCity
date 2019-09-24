import { Injectable } from '@angular/core';
import { PlacesResponse } from '../interfaces/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public data: PlacesResponse;
  private apiKey = '';

  constructor() { }

  async getPlaces(input: string) {

    let response: Response;
    try {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";

      response = await fetch(proxyurl + `https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&input=${input}&key=${this.apiKey}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }


    } catch (err) {
      return Promise.reject(err);
    }
    const placesData = await response.json();
    console.log(placesData);
    return this.processData(placesData);
  }

  processData (data: PlacesResponse) {

    return data.predictions.filter(item => {
      return item.description.toLowerCase();
    });
   // return (this.data = data);
  }

}
