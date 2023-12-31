import { useCookies } from "react-cookie";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { Button, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import './Lobby.css'
import { NameCard } from "../components/NameCard";
import { OfflineIndicator } from "../components/OfflineIndicator";
import { LobbyPlayer, LobbyState } from "@backend/types";
import { Verified } from "../components/Verified";

export const Lobby = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [players, setPlayers] = useState<Array<LobbyPlayer>>([]);
  const [lobbyHost, setLobbyHost] = useState<string>("");
  
  const [cookies, _] = useCookies(['pres_id']);

  const { code } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if(code === "D") return; // debug mode

    socket.connect();
    socket.on('connect', ()=>{setIsConnected(true)});
    socket.on('disconnect',()=>{setIsConnected(false)});

    socket.on('lobby', (lobby: LobbyState) => {
      setPlayers(lobby.players);
      setLobbyHost(lobby.host_id);
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
    <Verified>
      <div className="container">
        <h1>Lobby</h1>
        <div className="tags">
          <Tag color="orange">{code}</Tag>
          <Tag> Standard </Tag>
          <Tag> 3 Players </Tag>
        </div>
        <div className="players">
          Players
          {players.map((p, i) =>
            <NameCard
              key={i}
              name={p.name}
              wins={p.wins}
              host={p.id === lobbyHost}
            />
          )}
        </div>
        <Button
          className="start-game"
          type="primary"
          htmlType="submit"
          onClick={handleStart}
          disabled={lobbyHost !== cookies.pres_id}
        >
          Start Game
        </Button>
        <OfflineIndicator isHidden={isConnected} />
      </div>
    </Verified>
  )
}
