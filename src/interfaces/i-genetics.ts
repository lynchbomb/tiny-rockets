import { ICoords } from './i-coords';

// the basis for an item to have genetics applied
// ie. rocket needs to have a property that implements 
// the genetics item interface (this interface)
export interface IGeneticsItem {
  score: number;
  coords: ICoords;
  probability: number;
};
