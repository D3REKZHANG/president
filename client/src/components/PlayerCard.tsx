import small_cards from '../assets/small-cards.png';
import './PlayerCard.css'

type Props = {
  name: string;
  cardCount: number;
  active: boolean;
}

const PlayerCard = ({ name, cardCount, active }: Props) => {
  return (
    <div className="player">
      <div className={`circle ${active ? "active" : ""}`}>{name}</div>
      <div className="card-count">
        {cardCount}
        <img width="25px" src={small_cards} />
      </div>
    </div>
  )
}

export { PlayerCard }
