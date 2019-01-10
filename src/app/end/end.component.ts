import { Component } from '@angular/core';
import { Player } from '../helpers/Player';
import { SettingService } from '../helpers/settings.service';
import { AppConstants } from '../helpers/Constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent {
  players: Array<Player>;
  color: Array<string>;
  constructor(private service: SettingService,
    private translate: TranslateService) {
    this.color = ['warning', 'medium', 'bronze'];
  }

  ionViewWillEnter() {
    this.service.getStoredLanguage().then((language) => {
      this.translate.use(language);
    });
    this.players = this.service.getEndPlayers();
  }

  repeatGame() {
    this.service.clearPlayersScore();
    this.service.navigatePage(AppConstants.GAME_URL);
  }

  newGame() {
    this.service.clearStorage();
    this.service.navigatePage(AppConstants.HOME_URL);
  }
}
