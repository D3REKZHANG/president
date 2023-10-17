import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { Button } from 'antd';
import { DisconnectOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';

import { HandCard } from '../types';
import { Card, GameState } from '@backend/types';
import { socket } from '../socket';
import { HandElement } from '../components/HandElement';
import { CardElement } from '../components/CardElement';
import { PlayerCard } from '../components/PlayerCard';

import 'react-toastify/dist/ReactToastify.css';
import './Game.css'

type PlayerInfo = {
  id: string;
  name: string;
  cardCount: number;
}

const Game = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [hand, setHand] = useState<Array<HandCard>>([]);
  const [top, setTop] = useState<Array<Card>>([]);
  const [turn, setTurn] = useState<number>(0);

  const [cookies, _] = useCookies(['pres_id']);
  const [players, setPlayers] = useState<Array<PlayerInfo>>([]);

  const code = 'ABCD';

  useEffect(() => {
    socket.connect();
    socket.on('connect', ()=>{setIsConnected(true)});
    socket.on('disconnect',()=>{setIsConnected(false)});
    socket.on('state', (state: GameState)=>{
      console.log("received \'state\'");
      console.log(state);
      setTop(state.top);
      setPlayers(state.players.map(p => ({
        id: p.id,
        name: p.name,
        cardCount: p.hand.length,
      })));
      setTurn(state.turn);
      if(hand.length == 0) {
        // set hand on first connect
        console.log("asdf");
        setHand(state.players.filter(player => player.id == cookies.pres_id)[0].hand);
      }
    });

    socket.emit('state', code);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePlay = () => {
    const played: Array<Card> = hand.filter(card => card.selected).map(card => card as Card);
    socket.emit('play', code, cookies.pres_id, played);
    setHand(hand.filter(card => !card.selected));
  }

  return (
    <div className="container">
      <div className="opponents">
        {players.map((player, i) =>
          <PlayerCard
            key={i}
            name={player.name}
            cardCount={player.cardCount}
            active={i == turn}
          />
        )}
      </div>
      <div className="pile"> 
        {top.map(card => <CardElement card={card} />)}
      </div>
      <HandElement hand={hand} setHand={setHand}/>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size='large'
          shape='round'
          onClick={handlePlay}
          disabled={players[turn]?.id !== cookies.pres_id}
        >
          play
        </Button>
      </motion.div>
      {!isConnected && <DisconnectOutlined style={{position: 'absolute', bottom: 10}} />}
      {cookies.pres_id['pres_id']}
      <ToastContainer />
    </div>
  )
}

export { Game }
