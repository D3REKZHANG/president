export type getIdRo = {
  newId: string
}

export type postGameRo = {
  code: string
}

export type getGamesRo = {
  games: Array<string>
}

export type verifyRo = {
  gameExists: boolean
  playerBelongs: boolean
}

export type errorRo = string;
