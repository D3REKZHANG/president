import { Card, GameState, PlayerRank } from "./types";

class Player {
  hand: Array<Card> = [];
  rank = PlayerRank.REGULAR;
  constructor(public name: string) {}
}

class Game {
  private state: "START" | "GAME" | "TRADE" = "START";
  private players: Array<Player> = [];
  private turn: number = 0;
  private deck: Array<Card> = [];
  private pile: Array<Array<Card>> = [];
  private top: Array<Card> = [];
  constructor(public code: string) {
    for (let s = 0; s < 4; s++) {
      for (let v = 1; v < 13; v++) {
        this.deck.push({ value: v, suite: s });
      }
    }
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  addPlayer(name: string): number {
    this.players.push(new Player(name));
    return this.players.length - 1;
  }

  getPlayerName(id: number): string {
    if(id < 0 || id > this.players.length) return "null"

    return this.players[id].name;
  }

  newRound() {
    this.pile = [];
    this.top = [];
    this.shuffle();
    // deal cards
    const handSize = this.deck.length / this.players.length;
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].hand = this.deck.slice(handSize * i, handSize * (i + 1));
    }
  }

  play(player: number, cards: Array<Card>) {
    const set = new Set();
    cards.forEach((card) => set.add(card));
    this.players[player].hand = this.players[player].hand.filter(
      (card) => !set.has(card),
    );

    this.pile.push(cards);
    this.top = cards;
    this.turn = (this.turn+1)%this.players.length;
  }

  getTop(): Array<Card> {
    return this.top;
  }

  getState(): GameState {
    return {
      top: this.top,
      pile: this.pile,
      players: this.players,
      turn: this.turn
    };
  }
}

export { Player, Game };
