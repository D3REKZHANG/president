import { Button, Input } from 'antd'
import './Join.css'
import { useState } from 'react';
import { BackButton } from '../components/BackButton';

const Join = () => {

  const [code, setCode] = useState<string>('');
  const [nick, setNick] = useState<string>('');

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
        disabled={nick === '' || code === ''}
      >
        Join Game
      </Button>
    </div>
  );
}

export { Join }
