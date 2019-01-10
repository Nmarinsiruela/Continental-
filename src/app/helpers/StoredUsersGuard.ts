import { SettingService } from './settings.service';
import { AppConstants } from './Constants';
import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class StoredUsersGuard implements CanActivate {
  constructor(private service: SettingService) {}

  canActivate() {
    return this.checkStorage();
  }

  async checkStorage() {
    const players = await this.service.getStoredPlayers();
    if (players.getValue().length > 0) {
      return true;
    }
    this.service.navigatePage(AppConstants.HOME_URL);
    return false;
  }
}
