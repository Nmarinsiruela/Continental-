import { PlayerService } from './PlayerService';
import { AppConstants } from './Constants';
import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class StoredUsersGuard implements CanActivate {
  constructor(private pService: PlayerService) {}

  canActivate() {
    return this.checkStorage();
  }

  async checkStorage() {
    const players = await this.pService.getStoredPlayers();
    if (players.getValue().length > 0) {
      return true;
    }
    this.pService.navigatePage(AppConstants.HOME_URL);
    return false;
  }
}
