export const AppConstants  = {
  get STARTER_ROUND(): number {
    return 1;
  },
  get END_GAME(): number {
    return 7;
  },
  get BUTTON_TEXT_BASE(): string {
    return 'NEXTROUND';
  },
  get BUTTON_TEXT_END(): string {
    return 'GAMEOVER';
  },
  get ROUNDS(): string {
    return 'rounds';
  },
  get PLAYERS(): string {
    return 'players';
  },
  get LANG(): string {
    return 'language';
  },
  get AUDIO(): string {
    return 'audio';
  },
  get GAME_URL(): string {
    return '/game';
  },
  get HOME_URL(): string {
    return '/home';
  },
  get END_URL(): string {
    return '/end';
  },

  get SPANISH_LANG(): string {
    return 'es';
  },

  get ENGLISH_LANG(): string {
    return 'en';
  },

  GET_ROUND_TEXT(value): string {
    switch (value) {
      case 1:
        return 'ROUND1';
      case 2:
        return 'ROUND2';
      case 3:
        return 'ROUND3';
      case 4:
        return 'ROUND4';
      case 5:
        return 'ROUND5';
      case 6:
        return 'ROUND6';
      case 7:
        return 'ROUND7';
    }
  }
};
