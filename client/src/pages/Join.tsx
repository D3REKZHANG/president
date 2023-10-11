import { Button, Input } from 'antd'
import './Join.css'
import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { socket } from '../socket';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Join = () => {

  const [code, setCode] = useState<string>('');
  const [nick, setNick] = useState<string>('');

  const navigate = useNavigate();
  const [cookies,_] = useCookies(['pres_id']);

  const handleSubmit = () => {
    socket.connect();
    socket.emit('join-game', code, cookies.pres_id, nick);

    navigate('/game');
  }

  return (
    <div className="container">

      <BackButton />

      <h1>Join Game</h1>

      <div className="form">
        <p>Room Code</p>
        <Input 
          value = {code}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setCode(e.currentTarget.value)}
        />

        <p>Nickname</p>
        <Input 
          value = {nick}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setNick(e.currentTarget.value)}
        />
      </div>

      <Button
        className="submit"
        type="primary"
        htmlType="submit"
        onClick={handleSubmit}
        disabled={nick === '' || code === ''}
      >
        Join Game
      </Button>
    </div>
  );
}

export { Join }
