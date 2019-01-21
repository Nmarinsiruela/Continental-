import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import { SettingService } from './helpers/settings.service';
import { AppConstants } from './helpers/Constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'GAME',
      url: '/home',
      src: '../assets/icon/md-home.svg'
    },
    {
      title: 'OPTIONS',
      url: '/list',
      src: '../assets/icon/md-list.svg'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private service: SettingService,
    private translate: TranslateService
  ) {
    this.initializeApp();
    this.translate.setDefaultLang(AppConstants.SPANISH_LANG);
    this.service.getStoredLanguage().then(language => {
      this.translate.use(language);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
}
