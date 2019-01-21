import { Component } from '@angular/core';
import { SettingService } from '../helpers/settings.service';
import { Player } from '../helpers/Player';
import { AppConstants } from '../helpers/Constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  newPlayer: string;
  players: Array<Player>;
  maximumPlayers: boolean;
  constructor(
    private service: SettingService,
  ) {
    this.newPlayer = '';
    this.players = [];
    this.maximumPlayers = false;
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
