import { motion } from 'framer-motion';
import small_cards from '../assets/small-cards.png';

import './Game.css'
import { useState } from 'react';
import { Button } from 'antd';

import { Card, HandCard, Suite } from '../types';
import { HandElement } from '../components/HandElement';
import { CardElement } from '../components/CardElement';


const initialHand = [
  {value: 3, suite: Suite.DIAMONDS},
  {value: 5, suite: Suite.DIAMONDS},
  {value: 11, suite: Suite.HEARTS, selected: true},
  {value: 2, suite: Suite.SPADES},
];

const opponents = ['Daniel', 'Eric'];

const Game = () => {

  const [hand, setHand] = useState<Array<HandCard>>(initialHand);

  const handlePlay = () => {
    console.log(hand.filter(card => card.selected));
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
        <CardElement card={{value: 5, suite: Suite.SPADES}} />
      </div>
      <HandElement hand={hand} setHand={setHand}/>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button size='large' shape='round' onClick={handlePlay}> play </Button>
      </motion.div>
    </div>
  )
}

export { Game }
