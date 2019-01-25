import { Player } from './Player';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConstants } from './Constants';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private players = new BehaviorSubject(Array<Player>());
  private actualRound = new BehaviorSubject(+AppConstants.STARTER_ROUND);
  private endPlayers: Array<Player>;
  language: string;
  enabledAudio: boolean;
  audio = new Audio();
  constructor(private storage: Storage,
              private router: Router) {
  }

  getPlayers() {
    return this.players.getValue();
  }

  getRound() {
    return this.actualRound.getValue();
  }

  // HOME METHODS

  setNewPlayer(name) {
    if (name !== '') {
      this.getPlayers().push(new Player(name));
    }
    return this.getPlayers();
  }

  removePlayer(name) {
    const index: number = this.getPlayers().indexOf(name);
    if (index !== -1) {
        this.getPlayers().splice(index, 1);
    }
  }

  setNewGame() {
    this.storage.set(AppConstants.PLAYERS, JSON.stringify(this.getPlayers()));
    this.storage.set(AppConstants.ROUNDS, AppConstants.STARTER_ROUND);
  }

  // GAME METHODS

  getStoredPlayers() {
    return this.getFromStorageAsync(AppConstants.PLAYERS).then(playersArray => {
      const data = JSON.parse(playersArray);
      this.players = data !== null ? new BehaviorSubject(data) : new BehaviorSubject([]);
      return this.players;
    });
  }

  getStoredRound() {
    return this.getFromStorageAsync(AppConstants.ROUNDS).then(actualRound => {
      this.actualRound = new BehaviorSubject(+actualRound);
      return this.actualRound;
    });
  }

  getStoredLanguage() {
    return this.getFromStorageAsync(AppConstants.LANG).then(language => {
      this.language = language !== null ? language : AppConstants.SPANISH_LANG;
      return this.language;
    });
  }

  getStoredAudio() {
    return this.getFromStorageAsync(AppConstants.AUDIO).then(audio => {
      this.enabledAudio = audio !== null ? audio === true : true;
      return this.enabledAudio;
    });
  }

  getFromStorageAsync(keyStorage) {
    return this.storage.get(keyStorage);
  }

  clearStorage() {
    this.storage.remove(AppConstants.PLAYERS);
    this.storage.remove(AppConstants.ROUNDS);
    this.navigatePage(AppConstants.HOME_URL);
    this.players = new BehaviorSubject([]);
    this.actualRound = new BehaviorSubject(+AppConstants.STARTER_ROUND);
  }

  navigatePage(destiny: string) {
    this.router.navigateByUrl(destiny);
  }

  setNewRound(newPoints) {
    this.actualRound.next(this.getRound() + 1);

    for (let x = 0; x < this.getPlayers().length; x++) {
      this.getPlayers()[x].count += newPoints[x];
    }

    this.storage.set(AppConstants.PLAYERS, JSON.stringify(this.getPlayers()));
    this.storage.set(AppConstants.ROUNDS, '' + this.getRound());
    if (this.getRound() < 8) {
      this.playAudio('' + this.getRound());
    }
  }

  clearPlayersScore() {
    for (let x = 0; x < this.getPlayers().length; x++) {
      this.getPlayers()[x].count = 0;
    }
    this.setNewGame();
  }

  getEndPlayers(players) {
    this.endPlayers = Object.assign([], players);
    this.endPlayers.sort((obj1, obj2) => {
      if (obj1.count > obj2.count) {
          return 1;
      }
      if (obj1.count < obj2.count) {
          return -1;
      }
      return 0;
  });
  return this.endPlayers;
  }

  playAudio(round: string) {
    if (this.enabledAudio === true) {
      this.audio = new Audio(`../../assets/audio/${this.language}/round-${round}.mp3`);
      this.audio.load();
      this.audio.play();
    }
  }

  // OPTIONS METHODS

  setLanguage(option: string) {
    this.language = option;
    this.storage.set(AppConstants.LANG, this.language);
  }

  getLanguage() {
    return this.language;
  }

  getAudioEnabled() {
    return this.enabledAudio;
  }

  setAudio(audioEnabled) {
    this.enabledAudio = audioEnabled;
    this.storage.set(AppConstants.AUDIO, this.enabledAudio);
  }
}
