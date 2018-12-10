import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newPlayer: string;
  players: Array<string>;
  constructor() {
    this.newPlayer = '';
    this.players = [];
  }

  setNewPlayer(name) {
    if (name !== '') {
      this.players.push(name);
      this.newPlayer = '';
    }
  }

  removePlayer(player) {
    const index: number = this.players.indexOf(player);
    if (index !== -1) {
        this.players.splice(index, 1);
    }
  }

  setPlayers() {
    for (let x = 0; x < this.players.length; x++) {
      console.log(this.players[x]);
    }
  }


}
