export function generateMatrix(rows: number, columns: number, fillWith: any = undefined) {
  return new Array(rows).fill(fillWith).map(() => new Array(columns).fill(fillWith));
}

export function randomIntBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomVectorBetween(min: number, max: number): number[] {
  return [randomIntBetween(min, max), randomIntBetween(min, max)];
}

export function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * (9999999 - 0o0)).toString(16);
}
