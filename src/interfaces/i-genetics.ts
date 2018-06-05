import {
  ICoords
} from 'scalar-js';

export interface IGeneticsItem {
  score: number;
  coords: ICoords;
  probability: number;
}
