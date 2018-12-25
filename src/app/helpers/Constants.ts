export class AppConstants {
  public static get STARTER_ROUND(): number {
    return 0;
  }
  public static get END_GAME(): number {
    return 6;
  }
  public static get BUTTON_TEXT_BASE(): string {
    return 'Siguiente Ronda';
  }
  public static get BUTTON_TEXT_END(): string {
    return 'Fin del Juego';
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
        return '2 Tríos';
      case 1:
        return '1 Trío y 1 Escalera';
      case 2:
        return '2 Escaleras';
      case 3:
        return '3 Tríos';
      case 4:
        return '2 Tríos y 1 Escalera';
      case 5:
        return '2 Escaleras y 1 Trío';
      case 6:
        return '3 Escaleras';
    }
  }
}
