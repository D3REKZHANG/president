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
  top: Array<Card>;
  pile: Array<Array<Card>>;
  players: Array<PlayerState>;
  turn: number;
};

export { Suite, PlayerRank }
