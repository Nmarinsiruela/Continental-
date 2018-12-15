import { Component, OnInit, DoCheck } from '@angular/core';
import { Player } from '../helpers/Player';
import { PlayerService } from '../helpers/PlayerService';
import { AppConstants } from '../helpers/Constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  actualRound: number;
  players: Array<Player>;
  actualPoints: Array<number>;
  roundCompleted: boolean;
  buttonText: string;
  storeCompleted: boolean;
  constructor(private pService: PlayerService) {
    this.actualPoints = [];
    this.storeCompleted = false;
  }

  async ngOnInit() {
    this.players = await this.pService.getStoredPlayers();
    this.actualRound = await this.pService.getStoredRound();
    for (let x = 0; x < this.players.length; x++) {
      this.actualPoints.push(null);
    }
    this.setButtonText();
    this.storeCompleted = true;
  }

  nextRound() {
    this.pService.setNewRound(this.actualPoints);
    this.actualRound = this.pService.getRound();

    if (this.actualRound === AppConstants.END_GAME) {
      // End Game
    }
    this.setButtonText();
    for (let x = 0; x < this.players.length; x++) {
      this.actualPoints[x] = null;
    }
  }

  endGame() {
    this.pService.navigatePage(AppConstants.END_URL);
  }

  setButtonText() {
    console.log(this.actualRound);
    if (this.actualRound === AppConstants.FINAL_ROUND) {
      this.buttonText = AppConstants.BUTTON_TEXT_FINAL;
    } else if (this.actualRound === AppConstants.END_GAME) {
      this.buttonText = AppConstants.BUTTON_TEXT_END;
    } else {
      this.buttonText = AppConstants.BUTTON_TEXT_BASE;
    }
  }

  clearGame() {
    this.pService.clearStorage();
  }
}
