import { Button, Input, Radio, RadioChangeEvent } from 'antd'
import './Create.css'
import { useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { postGame } from '../api';
import { socket } from '../socket';
import { useCookies } from 'react-cookie';

import { getId } from '../api';

const Create = () => {

  const [variation, setVariation] = useState('standard');
  const [players, setPlayers] = useState<Number>(3);
  const [nick, setNick] = useState<string>('');

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['pres_id']);

  useEffect(() => {
    if(!cookies.hasOwnProperty('pres_id')) {
      getId().then(newId => setCookies('pres_id', newId));
    }
  }, []);

  const handleSubmit = async () => {
    const code = await postGame();
    socket.connect();
    socket.emit('join-game', code, cookies.pres_id, nick);
    socket.on('lobby-players', (_) => {
      navigate(`/lobby/${code}`); // once join-game bounces back, we navigate
    });
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
