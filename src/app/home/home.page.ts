import { Component } from '@angular/core';
import { PlayerService } from '../helpers/PlayerService';
import { Player } from '../helpers/Player';
import { AppConstants } from '../helpers/Constants';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newPlayer: string;
  players: Array<Player>;
  maximumPlayers: boolean;
  constructor(private pService: PlayerService) {
    this.newPlayer = '';
    this.players = [];
    this.maximumPlayers = false;
  }

  setNewPlayer(name) {
    if (this.players.length <= 7) {
      this.maximumPlayers = false;
      this.players = this.pService.setNewPlayer(name);
      this.newPlayer = '';
    } else {
      this.maximumPlayers = true;
    }
  }

  removePlayer(player) {
    this.pService.removePlayer(player);
  }

  setPlayers() {
    this.pService.setNewGame();
    this.pService.navigatePage(AppConstants.GAME_URL);
    this.players = [];
  }

}
