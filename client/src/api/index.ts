import axios from 'axios';

export type postLobbyDto = {
  roomName: string;
}

const SERVER_URL = 'http://localhost:3000'

const postLobby = async (payload: postLobbyDto) => {
  const data = await axios.post(`${SERVER_URL}/lobby`, payload);
  
  console.log(data);
}

export { postLobby }
