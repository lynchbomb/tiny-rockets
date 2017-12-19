import { ICoords } from './i-coords';
import { IVector } from './i-vector';

export interface IRocketOptions {
  fillStyle?: string;
  coords?: IVector;
  prevCoords?: IVector;
  STRcoords?: string;
  width?: number;
  height?: number;
  val?: ICoords;
  degrees?: number;
};
