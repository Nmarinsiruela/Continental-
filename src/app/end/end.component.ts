import { Component } from '@angular/core';
import { Player } from '../helpers/Player';
import { PlayerService } from '../helpers/PlayerService';
import { AppConstants } from '../helpers/Constants';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent {
  players: Array<Player>;
  color: Array<string>;
  constructor(private pService: PlayerService) {
    this.color = ['warning', 'medium', 'bronze'];
  }

  ionViewWillEnter() {
    this.players = this.pService.getEndPlayers();
  }

  repeatGame() {
    this.pService.clearPlayersScore();
    this.pService.navigatePage(AppConstants.GAME_URL);
  }

  newGame() {
    this.pService.clearStorage();
    this.pService.navigatePage(AppConstants.HOME_URL);
  }
}
