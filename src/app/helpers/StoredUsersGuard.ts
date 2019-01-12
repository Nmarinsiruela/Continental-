import { SettingService } from './settings.service';
import { AppConstants } from './Constants';
import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class StoredUsersGuard implements CanActivate {
  constructor(private service: SettingService) {}

  async canActivate() {
    const players = await this.service.getStoredPlayers();
    const rounds = await this.service.getStoredRound();
    if (players.getValue().length > 0) {
      if (rounds.getValue() === 7 ) {
        this.service.navigatePage(AppConstants.END_URL);
      } else {
        this.service.navigatePage(AppConstants.GAME_URL);
      }
    }
    return true;
  }
}
