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
  constructor(
    private service: SettingService,
    private translate: TranslateService
  ) {
  }

  async ionViewWillEnter() {
    this.service.getStoredLanguage().then(language => {
      this.translate.use(language);
    });
    const bPlayers = await this.service.getStoredPlayers();
    const players = bPlayers.getValue();
    this.players = this.service.getEndPlayers(players);
  }

  repeatGame() {
    this.service.clearPlayersScore();
    this.service.navigatePage(AppConstants.GAME_URL);
  }

  newGame() {
    this.service.clearStorage();
    this.service.navigatePage(AppConstants.HOME_URL);
  }

  returnColor(value: number) {
    switch (value) {
      case 0:
        return 'gold';
      case 1:
        return 'medium';
      case 2:
        return 'copper';
      default:
        return 'black';
    }
  }
}
