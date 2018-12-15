import { Player } from './Player';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConstants } from './Constants';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  numberOfPlayers: number;
  players: Array<Player>;
  actualRound: number;

  constructor(private storage: Storage, private navCtrl: NavController) {}

  getPlayers() {
    return this.players;
  }

  getRound() {
    return this.actualRound;
  }

  async getStoredPlayers() {
    return this.getFromStorageAsync(AppConstants.PLAYERS).then(playersArray => {
      const data = JSON.parse(playersArray);
      this.players = data !== null ? data : [];
      return this.players;
    });
  }

  async getStoredRound() {
    return this.getFromStorageAsync(AppConstants.ROUNDS).then(actualRound => {
      this.actualRound = +actualRound;
      return this.actualRound;
    });
  }

  async getFromStorageAsync(keyStorage) {
    return await this.storage.get(keyStorage);
  }

  clearStorage() {
    this.storage.clear().then( () => {
      this.players = [];
      this.navigatePage(AppConstants.HOME_URL);
    });
  }

  navigatePage(destiny) {
    if (destiny === AppConstants.HOME_URL) {
      this.navCtrl.navigateRoot(destiny);
    }
    this.navCtrl.navigateForward(destiny);
  }

  setActualPlayers() {
    this.storage.set(AppConstants.PLAYERS, JSON.stringify(this.players));
    this.storage.set(AppConstants.ROUNDS, AppConstants.STARTER_ROUND);
  }

  setNewRound(newPoints) {
    this.actualRound++;

    for (let x = 0; x < this.players.length; x++) {
      this.players[x].count += newPoints[x];
    }

    this.storage.set(AppConstants.PLAYERS, JSON.stringify(this.players));
    this.storage.set(AppConstants.ROUNDS, '' + this.actualRound);
  }

  setNewPlayer(name) {
    if (name !== '') {
      this.players.push(new Player(name));
    }
    return this.players;
  }

  removePlayer(name) {
    const index: number = this.players.indexOf(name);
    if (index !== -1) {
        this.players.splice(index, 1);
    }
  }
}
