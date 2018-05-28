import {
  ICoords
} from 'scalar-js';

export default interface IGeneticsItem {
  score: number;
  coords: ICoords;
  probability: number;
};
