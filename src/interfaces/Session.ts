export interface Session {
  bettingClosedAt: number;
  completedAt: number;
  id: string;
  name: string;
  owner: string;
  participants: string[];
  startedAt: number;
}
