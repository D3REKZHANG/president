import { CrownOutlined } from '@ant-design/icons';
import './NameCard.css'

type Props = {
  name: string;
  wins: number;
  host?: boolean;
}

const NameCard = ({ name, wins, host }: Props) => {
  return (
    <div className="namecard">
      <div className="name">{host && <CrownOutlined />} {name}</div>
      <div className="wins"> Wins: {wins} </div>
    </div>
  )
}

export { NameCard }
