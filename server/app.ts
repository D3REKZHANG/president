import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';

import { router } from './views';
import { socketServer } from './socket';
import { Game } from './game';

const app = express()
const PORT = 3000
const SOCKET_PORT = 3001;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use((_, res, next)=> {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());

app.use('/', router);

export const games = new Map<string, Game>()

socketServer(server);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

server.listen(SOCKET_PORT, () => {
  console.log(`Socket server listening on port ${SOCKET_PORT}`);
});
