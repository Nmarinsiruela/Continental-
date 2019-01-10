import { Component } from '@angular/core';
import { Player } from '../helpers/Player';
import { SettingService } from '../helpers/settings.service';
import { AppConstants } from '../helpers/Constants';
import { BehaviorSubject } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

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
  constructor(private service: SettingService,
              private translate: TranslateService) {
    this.actualPoints = [];
  }

  async ionViewWillEnter() {
    this.service.getStoredLanguage().then((language) => {
      this.translate.use(language);
    });
    this.bPlayers = await this.service.getStoredPlayers();
    this.bRound = await this.service.getStoredRound();
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
