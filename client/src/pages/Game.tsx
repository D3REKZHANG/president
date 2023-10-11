import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { Button } from 'antd';
import { DisconnectOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';

import { HandCard } from '../types';
import { Card, GameState, Suite } from '@backend/types';
import { socket } from '../socket';
import { HandElement } from '../components/HandElement';
import { CardElement } from '../components/CardElement';
import { PlayerCard } from '../components/PlayerCard';

import 'react-toastify/dist/ReactToastify.css';
import './Game.css'

const initialHand = [
  {value: 3, suite: Suite.DIAMONDS},
  {value: 5, suite: Suite.DIAMONDS},
  {value: 11, suite: Suite.HEARTS, selected: true},
  {value: 2, suite: Suite.SPADES},
];

const opponents = ['Daniel', 'Eric'];

const Game = () => {

  const [hand, setHand] = useState<Array<HandCard>>(initialHand);
  const [top, setTop] = useState<Array<Card>>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [cookies, _] = useCookies(['pres_id']);

  const code = 'ABCD';

  useEffect(() => {
    socket.on('connect', ()=>{setIsConnected(true)});
    socket.on('disconnect',()=>{setIsConnected(false)});
    socket.on('state', (state: GameState)=>{
      console.log("received \'state\'");
      console.log(state);
      setTop(state.top);
      setHand(state.players.filter(player => player.id == cookies.pres_id)[0].hand);
    });

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
        {opponents.map((name, i) => <PlayerCard key={i} name={name} cardCount={3} />)}
      </div>
      <div className="pile"> 
        {top.map(card => <CardElement card={card} />)}
      </div>
      <HandElement hand={hand} setHand={setHand}/>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button size='large' shape='round' onClick={handlePlay}> play </Button>
      </motion.div>
      {!isConnected && <DisconnectOutlined style={{position: 'absolute', bottom: 10}} />}
      {cookies.pres_id['pres_id']}
      <ToastContainer />
    </div>
  )
}

export { Game }
