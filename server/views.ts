import express from 'express';
import * as service from './service';
import { games } from './app';
import { Game } from './game';
const router = express.Router(); 

router.get('/id', (_, res) => {
  const newId = service.getNewId();

  res.status(200).json({newId});
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
