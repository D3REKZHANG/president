import jokerLogo from '../assets/joker-card.png'
import { Button } from 'antd'
import './Landing.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { getId } from '../api'

const Landing = () => {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(['pres_id']);

  useEffect(() => {
    if(!cookies.hasOwnProperty('pres_id')) {
      getId().then(newId => setCookies('pres_id', newId));
    }
  }, []);

  return (
    <div className="container">
      <div>
        <img src={jokerLogo} width="100px" className="logo react" alt="Joker logo" />
      </div>
      <h1>President</h1>
      <Button className="menu-button" onClick={()=>navigate("/new")}>
        Create Game
      </Button>
      <Button className="menu-button" onClick={()=>navigate("/join")}>
        Join Game
      </Button>
    </div>
  );
}

export { Landing }
