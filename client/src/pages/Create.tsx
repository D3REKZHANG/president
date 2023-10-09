import { Button, Input, Radio, RadioChangeEvent } from 'antd'
import './Create.css'
import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { postLobby } from '../api';
import { socket } from '../socket';

const Create = () => {

  const [variation, setVariation] = useState('standard');
  const [players, setPlayers] = useState<Number>(3);
  const [nick, setNick] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    postLobby({roomName: 'asdf'});
    socket.connect();
    socket.emit('create-game', 'XSKD', nick);
    socket.emit('start-game', 'XSKD');
    navigate('/game');
  }

  return (
    <div className="container">

      <BackButton />

      <h1>New Game</h1>

      <div className="form">
        <p>Variation</p>
        <Radio.Group
          defaultValue="standard"
          buttonStyle="solid"
          value={variation}
          onChange={(e: RadioChangeEvent) => setVariation(e.target.value)}
        >
          <Radio.Button value="standard">Standard</Radio.Button>
          <Radio.Button disabled value="equality">Equality</Radio.Button>
          <Radio.Button disabled value="special">Special</Radio.Button>
        </Radio.Group>

        <p>Players</p>
        <Radio.Group
          value={players}
          onChange={(e: RadioChangeEvent) => setPlayers(e.target.value)}
          buttonStyle="solid"
        >
          {Array.from(Array(6), (_,i) => 
            <Radio.Button key={i} value={i+3}>{i+3}</Radio.Button>
          )}
        </Radio.Group>

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
        disabled={nick === ''}
        onClick={handleSubmit}
      >
        Create Game
      </Button>
    </div>
  );
}

export { Create }
