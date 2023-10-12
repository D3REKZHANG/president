import { useCookies } from "react-cookie";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { ToastContainer } from "react-toastify";
import { PlayerCard } from "../components/PlayerCard";
import { DisconnectOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import './Lobby.css'

export const Lobby = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [players, setPlayers] = useState([]);
  
  const [cookies, _] = useCookies(['pres_id']);

  const { code } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();
    socket.on('connect', ()=>{setIsConnected(true)});
    socket.on('disconnect',()=>{setIsConnected(false)});

    socket.on('lobby-players', (players) => {
      setPlayers(players);
    });
    socket.on('game-start', () => {
      navigate(`/game/${code}`);
    });

    socket.emit('lobby', code);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleStart = () => {
    socket.emit('start-game', cookies.pres_id, code);
    navigate(`/game/${code}`);
  }

  return (
    <div className="container">
      <h1>Lobby</h1>
      <h1>{code}</h1>
      <div className="players">
        {players.map((name, i) => <PlayerCard key={i} name={name} cardCount={0} />)}
      </div>
      <Button
        className="submit"
        type="primary"
        htmlType="submit"
        onClick={handleStart}
      >
        Start Game
      </Button>
      {!isConnected && <DisconnectOutlined style={{position: 'absolute', bottom: 10}} />}
      <ToastContainer />
    </div>
  )
}
