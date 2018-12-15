export class AppConstants {
  public static get STARTER_ROUND(): number {
    return 0;
  }
  public static get END_GAME(): number {
    return 6;
  }
  public static get BUTTON_TEXT_BASE(): string {
    return 'Next Round';
  }
  public static get BUTTON_TEXT_END(): string {
    return 'End Game';
  }
  public static get ROUNDS(): string {
    return 'rounds';
  }
  public static get PLAYERS(): string {
    return 'players';
  }
  public static get GAME_URL(): string {
    return 'game';
  }
  public static get HOME_URL(): string {
    return 'home';
  }
  public static get END_URL(): string {
    return 'end';
  }

  public static GET_ROUND_TEXT(value): string {
    switch (value) {
      case 0:
        return 'Dos Tríos';
      case 1:
        return 'Un Trío y una Escalera';
      case 2:
        return 'Dos Escaleras';
      case 3:
        return 'Tres Tríos';
      case 4:
        return 'Dos Tríos y una Escalera';
      case 5:
        return 'Dos Escaleras y un Trío';
      case 6:
        return 'Tres Escaleras';
    }
  }
}
