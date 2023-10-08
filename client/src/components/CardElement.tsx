import { card_assets } from '../assets/cards/index';
import { Card } from '../types';

type Props = {
  card: Card
}

const CardElement = ({ card } : Props) => {

  return <img
    className='prevent-select'
    width='43px'
    height='64px'
    style={{objectFit: 'cover'}}
    src={card_assets[card.suite][card.value-1]}
  />
}

export { CardElement }
