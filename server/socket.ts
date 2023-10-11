import http from 'http';
import { Server } from "socket.io";
import { Card } from './types';
import { games } from './app';

export const socketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-game", (code, id, name) => {
      console.log("Received \'join-game\'");
      if(!games.has(code)) {
        console.log("  Unknown game code");
        return;
      }
      try {
        games.get(code)!.addPlayer(id, name);
        console.log(`  Added ${name} (Player ${id}) to game`);
        io.emit('state', games.get(code)!.getState());
      } catch(Error) {
        console.log(`  Failed. Player ${id}) already in game`);
      }
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

    socket.on("play", (code: string, id: string, cards: Array<Card>) => {
      console.log("Received \'play\'");
      if(!games.has(code)) {
        console.log("  Unknown game code");
        return;
      }
      games.get(code)!.play(id, cards);
      console.log(`  Player ${games.get(code)!.getPlayerName(id)} played ${cards.length} card(s)`);
      io.emit('state', games.get(code)!.getState());
      console.log("  Emitted game state");
    });
  });
}
