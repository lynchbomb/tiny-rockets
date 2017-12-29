import { ICoords } from './i-coords';

export default interface IGeneticsItem {
  score: number;
  coords: ICoords;
  probability: number;
};
