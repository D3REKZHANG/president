import Axios, { AxiosError, AxiosResponse } from 'axios';
import { getIdRo, postGameRo, verifyRo } from '@backend/dto/ro'

export type postLobbyDto = {
  roomName: string;
}

export class ErrorResponse {
  constructor(public message: string) {}
}

export const axios = Axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}:3000`,
  timeout: 4000,
});

export const getId = async () => {
  const res: AxiosResponse<getIdRo> = await axios.get('/id');
  
  return res.data.newId;
}

export const postGame = async () => {
  const res: AxiosResponse<postGameRo> = await axios.post('/game');
  
  return res.data.code;
}

export const getVerify = async (code: string) : Promise<verifyRo> => {
  return axios.get(`${SERVER_URL}/games/verify`, { params: {code: code }, withCredentials: true});
}
