import express from 'express';
import * as service from './service';
import { Game } from './game';
import { games } from './app';
const router = express.Router(); 

router.get('/id', (_, res) => {
  const newId = service.getNewId();

  res.status(200).json({newId});
}); 

router.get('/games', (_, res) => {
  res.status(200).json({games: games.keys()});
}); 

router.post('/game', (_, res) => {
  const code = 'ABCD';
  if(games.has('ABCD')) {
    console.log(`Game already exists with code ${code}`);
    res.status(404).json({code});
  }
  games.set(code, new Game(code));

  res.status(200).json({code});
}); 

export { router };
