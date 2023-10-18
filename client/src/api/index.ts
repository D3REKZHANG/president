import axios, { AxiosError, AxiosResponse } from 'axios';
import { getIdRo, postGameRo, verifyRo } from '@backend/dto/ro'

export type postLobbyDto = {
  roomName: string;
}

export class ErrorResponse {
  constructor(public message: string) {}
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

export const getVerify = async (code: string) : Promise<verifyRo | ErrorResponse> => {
  try {
  const res: AxiosResponse<verifyRo | string> = await axios.get(`${SERVER_URL}/games/verify`, { params: {code: code }, withCredentials: true});
    return res.data as verifyRo;
  } catch (err) {
    return new ErrorResponse((err as AxiosError).message);
  }

}
