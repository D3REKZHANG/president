enum Suite {
  DIAMONDS,
  CLUBS,
  HEARTS,
  SPADES,
}

export type Card = {
  value: number,
  suite: Suite,
}

enum PlayerRank {
  REGULAR,
  PRES,
  BUM,
}

export type PlayerState = {
  id: string;
  name: string;
  hand: Array<Card>;
  rank: PlayerRank;
}

export type GameState = {
  state: string;
  top: Array<Card>;
  pile: Array<Array<Card>>;
  players: Array<PlayerState>;
  turn: number;
};

export type LobbyPlayer = {
  id: string;
  name: string;
  wins: number;
}

export type LobbyState = {
  players: Array<LobbyPlayer>;
  host_id: string;
}

export { Suite, PlayerRank }
