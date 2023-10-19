import http from 'http';
import { Server } from "socket.io";
import { Card } from './types';
import { games } from './app';

const gameExists = (code: string): boolean => {
  if(!games.has(code)) {
    console.log(`  Unknown game code "${code}"`);
    return false;
  }
  return true;
}

export const socketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    },
  });

  io.on("connection", (socket) => {
    socket.on("lobby", (code) => {
      if(!gameExists(code)) return;

      io.emit("lobby", games.get(code)!.getLobby());
    })

    socket.on("join-game", (code, id, name) => {
      console.log("Received \'join-game\'");

      if(!gameExists(code)) return;

      try {
        games.get(code)!.addPlayer(id, name);
        console.log(`  Added ${name} (Player ${id}) to game`);
        io.emit("lobby-players", games.get(code)!.getPlayerName());
      } catch(e) {
        console.log(`  Failed. Player ${id}) already in game`);
      }
    });

    socket.on("start-game", (host_id, code) => {
      console.log("Received \'start-game\'");

      if(!gameExists(code)) return;

      if(games.get(code)!.getHostId() != host_id) {
        console.log("  Wrong host id");
        return;
      }
      games.get(code)!.newRound();
      console.log(`  Started new round for Game ${code}`);
      io.emit('game-start');
      io.emit('state', games.get(code)!.getState());
      console.log(`  Emitted state`);
    });

    socket.on("state", (code) => {
      console.log("Received \'state\'");
      if(!gameExists(code)) return;
      io.emit('state', games.get(code)!.getState());
      console.log(`  Emitted state`);
    });

    socket.on("play", (code: string, id: string, cards: Array<Card>) => {
      console.log("Received \'play\'");

      if(!gameExists(code)) return;

      games.get(code)!.play(id, cards);
      console.log(`  Player ${games.get(code)!.getPlayerName(id)} played ${cards.length} card(s)`);
      io.emit('state', games.get(code)!.getState());
      console.log("  Emitted game state");
    });

    socket.on("hand", (code: string, id: string) => {
      console.log("Received \'hand\'");
      if(!gameExists(code)) return;

      const game = games.get(code);
      
      if(!game!.id_ind.has(id)) {
        console.log(`  No player with id ${id}`);
        return;
      }

      socket.emit('hand', game!.players[game!.id_ind.get(id)!].hand);
      console.log(`  Emitted hand state to player ${id}`);
    });
  });
}
