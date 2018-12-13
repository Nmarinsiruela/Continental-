import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../helpers/PlayerService';
import { Player } from '../helpers/Player';
import { NavController } from '@ionic/angular';
import { GameComponent } from '../game/game.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  newPlayer: string;
  players: Array<Player>;
  constructor(private pService: PlayerService, private navCtrl: NavController) {
    this.newPlayer = '';
    this.players = [];
  }

  async ngOnInit() {
    this.players = await this.pService.getStoredPlayers();
  }
  setNewPlayer(name) {
    this.pService.setNewPlayer(name);
    this.newPlayer = '';
  }

  removePlayer(player) {
    this.pService.removePlayer(player);
  }

  setPlayers() {
    this.pService.setActualPlayers();
    this.navCtrl.navigateForward('game');
    for (let x = 0; x < this.players.length; x++) {
      console.log(this.players[x]);
    }
  }


}
