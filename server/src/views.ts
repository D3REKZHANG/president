import express, { Response } from 'express';
import * as service from './service';
import { Game } from './game';
import { games } from './app';
import { errorRo, getGamesRo, getIdRo, postGameRo, verifyRo } from './dto';
const router = express.Router(); 

router.get('/id', (_, res: Response<getIdRo>) => {
  const newId = service.getNewId();

  res.status(200).json({newId});
}); 

router.get('/games', (_, res: Response<getGamesRo>) => {
  res.status(200).json({games: [...games.keys()]});
}); 

router.get('/games/verify', (req, res: Response<verifyRo | errorRo>) => {
  const cookies = req.cookies;
  if(req.query.code === undefined) {
    console.log("[API]: GET /games/verify failed. No code provided.");
    res.status(400).send('No code provided.');
    return;
  }
  const code = req.query.code!.toString();

  if(!Object.keys(cookies).includes('pres_id')) {
    console.log("[API]: GET /games/verify failed. No pres_id cookie.");
    res.status(400).send('No pres_id cookie.');
    return;
  }
  const id = cookies.pres_id;

  res.status(200).json({
    gameExists: service.gameExists(code),
    playerBelongs: service.inGame(code, id),
  });
});

router.post('/game', (_, res: Response<postGameRo>) => {
  const code = 'ABCD';
  if(games.has('ABCD')) {
    console.log(`Game already exists with code ${code}`);
    res.status(404).json({code});
  }
  games.set(code, new Game(code));

  res.status(200).json({code});
}); 

export { router };
