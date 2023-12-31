import { Card, GameState, LobbyState, PlayerRank } from "./types";

class Player {
  hand: Array<Card> = [];
  rank = PlayerRank.REGULAR;
  wins: number = 0;
  constructor(
    public id: string,
    public name: string
  ) {}
}

class Game {
  private state: "LOBBY" | "GAME" | "TRADE" = "LOBBY";
  public players: Array<Player> = [];
  public turn: number = 0;
  private deck: Array<Card> = [];
  private pile: Array<Array<Card>> = [];
  public top: Array<Card> = [];
  public id_ind = new Map<string,number>();
  constructor(public code: string) {
    for (let s = 0; s < 4; s++) {
      for (let v = 1; v <= 13; v++) {
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

  addPlayer(id: string, name: string): number {
    if(this.id_ind.has(id)) {
      throw new Error();
    }
    this.players.push(new Player(id, name));
    this.id_ind.set(id,this.players.length-1)
    return this.players.length - 1;
  }

  getPlayerName(id?: string): string | Array<string> {
    if(id == undefined) {
      return this.players.map(player => player.name);
    }
    if(!this.id_ind.has(id))
      return "null"

    const ind = this.id_ind.get(id);
    if(ind! < 0 || ind! > this.players.length) return "null"

    return this.players[ind!].name;
  }

  getHostId(): string {
    return this.players[0].id;
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
    this.state = "GAME";
  }

  play(player_id: string, cards: Array<Card>) {
    const set = new Set<string>();
    const player: number | undefined = this.id_ind.get(player_id)
    if(player === undefined) {
      console.log("Unknown player id");
      return;
    }
    cards.forEach((card) => set.add(card.value.toString() + " " + card.suite.toString()));
    this.players[player].hand = this.players[player].hand.filter(
      (card: Card) => !set.has(card.value.toString() + " " + card.suite.toString()),
    );

    this.pile.push(cards);
    this.top = cards;
    this.turn = (this.turn+1)%this.players.length;
  }

  getLobby(): LobbyState {
    return {
      players: this.players.map(p => ({ id: p.id, name: p.name, wins: 0})),
      host_id: this.players[0].id
    }
  }

  getState(): GameState {
    return {
      state: this.state,
      top: this.top,
      pile: this.pile,
      players: this.players,
      turn: this.turn
    };
  }
}

export { Player, Game };
