import jokerLogo from '../assets/joker-card.png'
import { Button } from 'antd'
import './Landing.css'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
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
