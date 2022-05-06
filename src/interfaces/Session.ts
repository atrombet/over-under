export interface Session {
  bettingClosedAt: number | null;
  completedAt: number | null;
  id: string;
  name: string;
  owner: string;
  participants: string[];
  startedAt: number;
}
