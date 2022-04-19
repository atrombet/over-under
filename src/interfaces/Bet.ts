export interface Bet {
  id: number;
  text: string;
  count: number;
  overUnder: number;
  bettors: {
    uid: string;
    displayName: string;
    choice: 'over' | 'under' | 'push';
  }[];
}
