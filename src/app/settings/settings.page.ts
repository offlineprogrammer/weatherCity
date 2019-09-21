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

  ngOnInit() {
  }

}
