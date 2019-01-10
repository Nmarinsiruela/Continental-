import { Component } from '@angular/core';
import { SettingService } from '../helpers/settings.service';
import { Player } from '../helpers/Player';
import { AppConstants } from '../helpers/Constants';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newPlayer: string;
  players: Array<Player>;
  maximumPlayers: boolean;
  constructor(private service: SettingService, private translate: TranslateService) {
    this.newPlayer = '';
    this.players = [];
    this.maximumPlayers = false;

  }

  ionViewWillEnter() {
    this.service.getStoredLanguage().then((language) => {
      this.translate.use(language);
    });
    this.service.getStoredPlayers().then((players) => {
      this.service.getStoredRound().then((round) => {
        if (players.getValue().length > 0) {
          if (round.getValue() < 7) {
            this.service.navigatePage(AppConstants.GAME_URL);
          } else if (round.getValue() === 7) {
            this.service.navigatePage(AppConstants.END_URL);
          } else {
            console.log ('Error:', players, round);
          }
        }
      });
  });
  }

  setNewPlayer(name) {
    if (this.players.length <= 7) {
      this.maximumPlayers = false;
      this.players = this.service.setNewPlayer(name);
      this.newPlayer = '';
    } else {
      this.maximumPlayers = true;
    }
  }

  removePlayer(player) {
    this.service.removePlayer(player);
  }

  setPlayers() {
    this.service.setNewGame();
    this.service.navigatePage(AppConstants.GAME_URL);
    this.players = [];
  }
}
