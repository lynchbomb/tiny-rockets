import Vector from '../vector';

export default interface IRocketOptions {
  fillStyle?: string;
  coords: Vector;
  prevCoords?: Vector;
  STRcoords?: string;
  width?: number;
  height?: number;
  degrees?: number;
  maxVelocity?: number;
  mass?: number;
};
