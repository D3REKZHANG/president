import { expect, test } from 'vitest'
import { Game } from './game'
import { Card, GameState, PlayerState } from './types';

test('play method correctly removes cards from hand', () => {
  const game = new Game("AAAA");
  game.addPlayer('a', 'Derek');
  game.addPlayer('b', 'Dereck');
  game.newRound();
  const player: PlayerState = game.getState().players[0];
  const length: number = player.hand.length;
  const cards: Array<Card> = player.hand.slice(0,2);
  expect(player.hand.includes(cards[0])).toBe(true);
  expect(player.hand.includes(cards[1])).toBe(true);
  game.play('a', cards);
  const newGameState: GameState = game.getState()
  expect(newGameState.players[0].hand.length).toBe(length-2);
  expect(newGameState.players[0].hand.includes(cards[0])).toBe(false);
  expect(newGameState.players[0].hand.includes(cards[1])).toBe(false);
  expect(newGameState.top).toBe(cards)
});

