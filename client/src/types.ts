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

export interface HandCard extends Card {
  selected?: boolean;
}

export { Suite }
