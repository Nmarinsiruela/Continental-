import { Component, OnInit, DoCheck } from '@angular/core';
import { Player } from '../helpers/Player';
import { PlayerService } from '../helpers/PlayerService';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  actualRound: number;
  players: Array<Player>;
  actualPoints: Array<number>;
  roundCompleted: boolean;
  constructor(private pService: PlayerService) {
    this.actualPoints = [];
  }

  async ngOnInit() {
    this.players = await this.pService.getStoredPlayers();
    this.actualRound = await this.pService.getStoredRound();
    for (let x = 0; x < this.players.length; x++) {
      this.actualPoints.push(null);
    }
  }

  nextRound() {
    this.pService.setNewRound(this.actualPoints);
    this.actualRound = this.pService.getRound();
    for (let x = 0; x < this.players.length; x++) {
      this.actualPoints[x] = null;
    }
  }
}
