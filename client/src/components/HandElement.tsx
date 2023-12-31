import { Draggable, DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { HandCard } from '../types';
import { motion } from 'framer-motion';
import { CardElement } from './CardElement';
import { Card } from '@backend/types';

import './HandElement.css';
import { Button } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { sort } from '../helper';

type Props = {
  hand: Array<HandCard>;
  setHand: (arr: Array<HandCard>) => void;
}

const reorder = (list: Array<Card>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const HandElement = ({ hand, setHand }: Props) => {

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newHand = reorder(
      hand,
      result.source.index,
      result.destination.index
    );

    setHand(newHand);
  }

  const sortHand = (reverse = false) => {
    const copy = [...hand];
    sort(copy, reverse);
    setHand(copy);
  }

  return (
    <div className="hand-parent">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="hand prevent-select">
                {hand.map((card, index) => (
                  <Draggable
                    key={card.value.toString() + " " + card.suite.toString()}
                    draggableId={card.value.toString() + " " + card.suite.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          border: 'none',
                          /* marginLeft: '-22px', */
                          zIndex: index,
                          ...provided.draggableProps.style
                        }}
                      >
                        <motion.div
                          animate={card.selected ? {y:-25} : {}}
                          transition={{duration:0.2}}
                          style={{height: '100px'}}
                          onClick={()=> {
                            setHand([
                              ...hand.slice(0,index),
                              {...hand[index], selected:!card.selected},
                              ...hand.slice(index+1, hand.length)
                            ])
                          }}
                        >
                          <CardElement card={card} />
                        </motion.div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button size="small" icon={<DoubleLeftOutlined />} onClick={() => sortHand(true)}/>
      <Button size="small" icon={<DoubleRightOutlined />} onClick={() => sortHand()}/>
    </div>
  )

}

export { HandElement }
