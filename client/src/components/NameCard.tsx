import './NameCard.css'

type Props = {
  name: string;
  wins: number;
}

const NameCard = ({ name, wins }: Props) => {
  return (
    <div className="namecard">
      <div className="name">{name}</div>
      <div className="wins"> Wins: {wins} </div>
    </div>
  )
}

export { NameCard }
