import { ICoords } from './interfaces/i-coords';

export function generateMatrix(rows: number, columns: number, fillWith: any = undefined) {
  return new Array(rows).fill(fillWith).map(() => new Array(columns).fill(fillWith));
}

export function randomIntBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function createVectorR2(x: number = 0, y: number = 0): number[] {
  return [x, y];
}

export function createVectorR3(x: number = 0, y: number = 0, z: number): number[] {
  return [x, y, z];
}

export function createRandomVector(min: number, max: number, dimensionsCount: number): number[] {
  let _vector = [];

  while (dimensionsCount >= 1) {
    _vector.push(randomIntBetween(min, max));
    dimensionsCount--;
  }

  return _vector;
}

export function getUnitVectorR2(vector: number[]): number {
  return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
}

export function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * (9999999 - 0o0)).toString(16);
}

export function getHeadingDegrees(coords: ICoords): number {
  return Math.atan2(coords.y, coords.x) * 180 / Math.PI;
}

export function getHeadingRadians(coords: ICoords): number {
  return Math.atan2(coords.y, coords.x);
}

export function getRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

export function getDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}