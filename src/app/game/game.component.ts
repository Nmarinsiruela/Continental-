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
  roundText: string;
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
    this.roundText = AppConstants.GET_ROUND_TEXT(this.actualRound);
    this.setButtonText();
    this.storeCompleted = true;
  }

  nextRound() {
    this.pService.setNewRound(this.actualPoints);
    const newRound = this.pService.getRound();

    // if (this.actualRound === AppConstants.END_GAME + 1) {
    //   this.endGame();
    // }
    if (newRound === 2) {
      this.endGame();
    } else {
      this.actualRound = newRound;
      this.roundText = AppConstants.GET_ROUND_TEXT(this.actualRound);
      this.setButtonText();
      for (let x = 0; x < this.players.length; x++) {
        this.actualPoints[x] = null;
      }
    }
  }

  endGame() {
    this.pService.getEndPlayers();
    this.pService.navigatePage(AppConstants.END_URL);
  }

  setButtonText() {
    if (this.actualRound === AppConstants.END_GAME) {
      this.buttonText = AppConstants.BUTTON_TEXT_END;
    } else {
      this.buttonText = AppConstants.BUTTON_TEXT_BASE;
    }
  }

  clearGame() {
    this.pService.clearStorage();
    this.players = [];
    this.actualRound = 0;
  }
}
