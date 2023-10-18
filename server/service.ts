import { v4 as uuid } from 'uuid'
import { games } from './app'

export const getNewId = () => {
  return uuid();
}

export const gameExists = (code: string) => {
  return games.has(code);
}

export const inGame = (code: string, id: string) => {
  if(!games.has(code))
    return false;

  return games.get(code)!.id_ind.has(id);
}
