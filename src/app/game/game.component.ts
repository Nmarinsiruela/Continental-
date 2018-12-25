import { Component, OnInit } from '@angular/core';
import { Player } from '../helpers/Player';
import { PlayerService } from '../helpers/PlayerService';
import { AppConstants } from '../helpers/Constants';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  actualRound: number;
  bPlayers = new BehaviorSubject(Array<Player>());
  bRound = new BehaviorSubject(0);
  players: Array<Player>;
  actualPoints: Array<number>;
  roundCompleted: boolean;
  buttonText: string;
  roundText: string;
  constructor(private pService: PlayerService) {
    this.actualPoints = [];
  }

  async ionViewWillEnter() {
    this.bPlayers = await this.pService.getStoredPlayers();
    this.bRound = await this.pService.getStoredRound();
    this.players = this.bPlayers.getValue();
    this.actualRound = this.bRound.getValue();
    this.actualPoints = [];
    for (let x = 0; x < this.players.length; x++) {
      this.actualPoints.push(null);
    }
    this.roundText = AppConstants.GET_ROUND_TEXT(this.actualRound);
    this.setButtonText();
  }

  setButtonText() {
    if (this.actualRound === AppConstants.END_GAME) {
      this.buttonText = AppConstants.BUTTON_TEXT_END;
    } else {
      this.buttonText = AppConstants.BUTTON_TEXT_BASE;
    }
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
    this.pService.navigatePage(AppConstants.END_URL);
  }


  clearGame() {
    this.pService.clearStorage();
  }
}
