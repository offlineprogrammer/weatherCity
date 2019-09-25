import { Component } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private analyticsService: AnalyticsService,
    public router: Router,
    private title: Title,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.analyticsService.startTrackerWithId('UA-70035565-5');
    this.router.events
    .subscribe(event => {
      //observe router and when it start navigation it will track the view
      if (event instanceof NavigationStart) {
        let title = this.title.getTitle();
        //get title if it was sent on state
        if (this.router.getCurrentNavigation().extras.state) {
          title = this.router.getCurrentNavigation().extras.state.title;
        }
        //pass url and page title 
        this.analyticsService.trackView(event.url, title);
      }
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
