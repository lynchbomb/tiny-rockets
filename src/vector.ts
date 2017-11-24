import { IClamped, ICoords } from './interfaces/i-coords';

export default class Vector {
  public val: ICoords;
  private isClamped: IClamped = {
    x: false,
    y: false
  };

  constructor(vector: ICoords | null = null, dimensions: number = 2) {
    if (!vector) {
      this.val = dimensions < 3 ? this.createVectorR2() : this.createVectorR2();
    }else {
      this.val = vector;
    }
  }

  public add(vector: ICoords) {
    this.val.x = this.val.x + vector.x;
    this.val.y = this.val.y + vector.y;
  }
  public scalar(int: number) {
    this.val.x *= int;
    this.val.y *= int;
  }
  public multi(vector: ICoords) {
    this.val.x = this.val.x * vector.x;
    this.val.y = this.val.y * vector.y;
  }
  public divide(vector: ICoords) {
    this.val.x = this.val.x / vector.x;
    this.val.y = this.val.y / vector.y;
  }
  public limit(limit: number) {
    this.val.x = this.val.x > limit ? limit : this.val.x;
    this.val.y = this.val.y > limit ? limit : this.val.y;
  }
  public clamp(int: number) {
    this.isClamped.x = this.val.x >= int ? true : false;
    this.isClamped.y = this.val.y >= int ? true : false;
    this.val.x = this.isClamped.x ? int : this.val.x;
    this.val.y = this.isClamped.y ? int : this.val.y;
  }
  private createVectorR2(x: number = 0, y: number = 0): ICoords {
    return Object.create({x, y});
  }
}
