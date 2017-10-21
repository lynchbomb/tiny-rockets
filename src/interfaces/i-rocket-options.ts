import { ICoords } from './i-coords';

export interface IRocketOptions {
  fillStyle?: string;
  coords?: ICoords;
  prevCoords?: ICoords;
  STRcoords?: string;
  width?: number;
  height?: number;
};
