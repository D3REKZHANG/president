import { HandCard } from "./types";

export const sort = (hand: Array<HandCard>, reverse=false) => {
  const order = [-1,14,15,3,4,5,6,7,8,9,10,11,12,13];
  hand.sort((a: HandCard, b: HandCard) => {
    if(a.value == b.value) {
      return (reverse ? -1 : 1) * (a.suite - b.suite);
    }
    return (reverse ? -1 : 1) * (order[a.value] - order[b.value]);
  });
}
