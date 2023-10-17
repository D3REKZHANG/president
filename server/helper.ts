import { Card } from "./types";

export const cardEquals = (c1: Card, c2: Card): boolean => {
  return (c1.value == c2.value && c1.suite == c2.suite);
}

export const sort = () => {

}
