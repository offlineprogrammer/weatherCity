import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  async ngOnInit(){
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
  }

}
