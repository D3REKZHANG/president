import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";

import { router } from './views';
import { Game } from './game';
import { Card } from './types';

const app = express()
const port = 3000
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

io.on("connection", (socket) => {
  console.log("Connected")
  socket.on("create-game", (code, name) => {
    games.set(code, new Game(code));
    console.log(`  Created new Game ${code}`);
    const id = games.get(code)!.addPlayer(name);
    console.log(`  Added ${name} (Player ${id}) to game`);
  });
  socket.on("join-game", (code, name) => {
    console.log("Received \'join-game\'");
    if(!games.has(code)) {
      console.log("  Unknown game code");
      return;
    }
    const id = games.get(code)!.addPlayer(name);
    console.log(`  Added ${name} (Player ${id}) to game`);
    io.emit('state', games.get(code)!.getState());
  });
  socket.on("start-game", (code) => {
    console.log("Received \'start-game\'");
    if(!games.has(code)) {
      console.log("  Unknown game code");
      return;
    }
    games.get(code)!.newRound();
    console.log(`  Started new round for Game ${code}`);
    io.emit('state', games.get(code)!.getState());
  });
  socket.on("play", (code: string, player: number, cards: Array<Card>) => {
    console.log("Received \'play\'");
    if(!games.has(code)) {
      console.log("  Unknown game code");
      return;
    }
    games.get(code)!.play(player, cards);
    console.log(`  Player ${games.get(code)!.getPlayerName(player)} played ${cards.length} card(s)`);
    io.emit('state', games.get(code)!.getState());
    console.log("  Emitted game state");
  });
});

const games = new Map<String, Game>()

io.listen(3001);
