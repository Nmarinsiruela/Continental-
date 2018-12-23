import { Component, OnInit } from '@angular/core';
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
  constructor(private pService: PlayerService) {
    this.newPlayer = '';
    this.players = [];
  }

  setNewPlayer(name) {
    this.players = this.pService.setNewPlayer(name);
    this.newPlayer = '';
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
