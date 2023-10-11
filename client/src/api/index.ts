import axios, { AxiosResponse } from 'axios';
import { getIdRo, postGameRo } from '@backend/dto/ro'

export type postLobbyDto = {
  roomName: string;
}

const SERVER_URL = 'http://localhost:3000'

export const getId = async () => {
  const res: AxiosResponse<getIdRo> = await axios.get(`${SERVER_URL}/id`);
  
  return res.data.newId;
}

export const postGame = async () => {
  const res: AxiosResponse<postGameRo> = await axios.post(`${SERVER_URL}/game`);
  
  return res.data.code;
}
