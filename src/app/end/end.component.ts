import { Component, OnInit } from '@angular/core';
import { Player } from '../helpers/Player';
import { PlayerService } from '../helpers/PlayerService';
import { AppConstants } from '../helpers/Constants';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {
  players: Array<Player>;
  color: Array<string>;
  constructor(private pService: PlayerService) {
    this.color = ['primary', 'secondary', 'danger'];
  }

  async ngOnInit() {
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
