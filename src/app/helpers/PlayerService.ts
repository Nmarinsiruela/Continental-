import { Player } from './Player';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  ROUNDS = 'rounds';
  numberOfPlayers: number;
  players: Array<Player>;
  actualRound: number;

  constructor(private storage: Storage) {
    // this.getStoredPlayers();
    // this.getStoredRound();
  }

  getPlayers() {
    return this.players;
  }

  getRound() {
    return this.actualRound;
  }

  async getStoredPlayers() {
    console.log('Trying to fetch Storage for Players');
    return this.getFromStorageAsync('players').then(playersArray => {
      const data = JSON.parse(playersArray);
      console.log('Stored Data for Players', data);
      this.players = data !== null ? data : [];
      return this.players;
    });
  }

  async getStoredRound() {
    console.log('Trying to fetch Storage for Rounds');
    return this.getFromStorageAsync(this.ROUNDS).then(actualRound => {
      console.log('Stored Data for Rounds', actualRound);
      this.actualRound = +actualRound;
      return this.actualRound;
    });
  }

  async getFromStorageAsync(keyStorage) {
    return await this.storage.get(keyStorage);
  }

  setActualPlayers() {
    this.storage.set('players', JSON.stringify(this.players));
    this.storage.set(this.ROUNDS, '0');
  }

  setNewRound(newPoints) {
    this.actualRound++;

    for (let x = 0; x < this.players.length; x++) {
      this.players[x].count += newPoints[x];
    }

    this.storage.set('players', JSON.stringify(this.players));
    this.storage.set(this.ROUNDS, '' + this.actualRound);
  }

  setNewPlayer(name) {
    if (name !== '') {
      this.players.push(new Player(name));
    }
  }

  removePlayer(name) {
    const index: number = this.players.indexOf(name);
    if (index !== -1) {
        this.players.splice(index, 1);
    }
  }
}
