import { Player } from './Player';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConstants } from './Constants';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players = new BehaviorSubject(Array<Player>());
  actualRound = new BehaviorSubject(0);
  endPlayers: Array<Player>;
  constructor(private storage: Storage, private navCtrl: NavController) {}

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
    console.table(this.getPlayers());
    this.storage.set(AppConstants.PLAYERS, JSON.stringify(this.getPlayers()));
    this.storage.set(AppConstants.ROUNDS, AppConstants.STARTER_ROUND);
  }

  // GAME METHODS

  async getStoredPlayers() {
    return this.getFromStorageAsync(AppConstants.PLAYERS).then(playersArray => {
      const data = JSON.parse(playersArray);
      this.players = data !== null ? new BehaviorSubject(data) : new BehaviorSubject([]);
      return this.players;
    });
  }

  async getStoredRound() {
    return this.getFromStorageAsync(AppConstants.ROUNDS).then(actualRound => {
      this.actualRound = new BehaviorSubject(+actualRound);
      return this.actualRound;
    });
  }

  async getFromStorageAsync(keyStorage) {
    return await this.storage.get(keyStorage);
  }

  clearStorage() {
    this.storage.remove(AppConstants.PLAYERS);
    this.storage.remove(AppConstants.ROUNDS);
    this.navigatePage(AppConstants.HOME_URL);
    this.players = new BehaviorSubject([]);
    this.actualRound = new BehaviorSubject(0);
  }

  navigatePage(destiny: string) {
    if (destiny === AppConstants.HOME_URL) {
      this.navCtrl.navigateRoot(destiny);
    }
    this.navCtrl.navigateForward(destiny);
  }

  setNewRound(newPoints) {
    this.actualRound.next(this.getRound() + 1);

    for (let x = 0; x < this.getPlayers().length; x++) {
      this.getPlayers()[x].count += newPoints[x];
    }

    this.storage.set(AppConstants.PLAYERS, JSON.stringify(this.getPlayers()));
    this.storage.set(AppConstants.ROUNDS, '' + this.getRound());
  }

  clearPlayersScore() {
    for (let x = 0; x < this.getPlayers().length; x++) {
      this.getPlayers()[x].count = 0;
    }
    this.setNewGame();
  }
  getEndPlayers() {
    this.endPlayers = Object.assign([], this.getPlayers());
    this.endPlayers.sort((obj1, obj2) => {
      if (obj1.count > obj2.count) {
          return 1;
      }
      if (obj1.count < obj2.count) {
          return -1;
      }
      return 0;
  });

  return this.endPlayers.slice(0, 3);
  }
}
