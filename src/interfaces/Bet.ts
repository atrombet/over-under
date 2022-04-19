export interface Bet {
  id: number;
  text: string;
  count: number;
  overUnder: number;
  bettors: Bettor[];
}

export interface Bettor {
  id: string;
  uid: string;
  displayName: string;
  choice: 'over' | 'under' | 'push';
}
