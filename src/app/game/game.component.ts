import { Component } from '@angular/core';
import { Player } from '../helpers/Player';
import { SettingService } from '../helpers/settings.service';
import { AppConstants } from '../helpers/Constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  actualRound: number;
  players: Array<Player>;
  actualPoints: Array<number>;
  roundCompleted: boolean;
  buttonText: string;
  roundText: string;
  constructor(private service: SettingService) {
    this.actualPoints = [];
  }

  ionViewWillEnter() {
    this.service.getStoredPlayers().then(bPlayers => {
      this.service.getStoredRound().then(bRound => {
        this.players = bPlayers.getValue();
        this.actualRound = bRound.getValue();
        this.actualPoints = [];
        for (let x = 0; x < this.players.length; x++) {
          this.actualPoints.push(null);
        }
        this.roundText = AppConstants.GET_ROUND_TEXT(this.actualRound);
        this.setButtonText();
      });
    });
  }

  setButtonText() {
    if (this.actualRound === AppConstants.END_GAME) {
      this.buttonText = AppConstants.BUTTON_TEXT_END;
    } else {
      this.buttonText = AppConstants.BUTTON_TEXT_BASE;
    }
  }

  nextRound() {
    this.service.setNewRound(this.actualPoints);
    const newRound = this.service.getRound();

    if (newRound === AppConstants.END_GAME + 1) {
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
    this.service.navigatePage(AppConstants.END_URL);
  }


  clearGame() {
    this.service.clearStorage();
  }
}
