import { motion } from 'framer-motion';
import small_cards from '../assets/small-cards.png';
import 'react-toastify/dist/ReactToastify.css';

import './Game.css'
import { useEffect, useState } from 'react';
import { Button } from 'antd';

import { HandCard } from '../types';
import { Card, GameState, Suite } from '@backend/types';
import { HandElement } from '../components/HandElement';
import { CardElement } from '../components/CardElement';
import { socket } from '../socket';
import { DisconnectOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';


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

  useEffect(() => {
    socket.on('connect', ()=>{setIsConnected(true)});
    socket.on('disconnect',()=>{setIsConnected(false)});
    socket.on('state', (state: GameState)=>{
      console.log("received \'state\'");
      console.log(state);
      setTop(state.top);
      // setHand(state.players[0].hand);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePlay = () => {
    const played: Array<Card> = hand.filter(card => card.selected).map(card => card as Card);
    socket.emit('play', 'XSKD', 0, played);
    setHand(hand.filter(card => !card.selected));
  }

  return (
    <div className="container">
      <div className="opponents">
        {opponents.map((name, i) => 
          <div key={i} className="player">
            <div className="circle">{name}</div>
            <div className="card-count">
              3
              <img width="25px" src={small_cards} />
            </div>
          </div>
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
        <Button size='large' shape='round' onClick={handlePlay}> play </Button>
      </motion.div>
      {!isConnected && <DisconnectOutlined style={{position: 'absolute', bottom: 10}} />}
      <ToastContainer />
    </div>
  )
}

export { Game }
