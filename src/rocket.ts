import { ICoords } from './interfaces/i-coords';
import { IRocketOptions } from './interfaces/i-rocket-options';
import { randomIntBetween } from './utils';

export default class Rocket implements IRocketOptions {
  public fillStyle: string;
  public width: number;
  public height: number;
  public coords: ICoords;
  public prevCoords: ICoords;
  public strCoords: string = '';

  constructor(options: IRocketOptions) {
    this.coords = options.coords || {x: 0, y: 0};
    this.prevCoords = {x: 0, y: 0};
    this.fillStyle = options.fillStyle || 'ff0000';
    this.width = options.width || 1;
    this.height = options.height || 1;
    this.strCoordsSet();
  }

  public set setFillStyle(fillStyle: string) {
    this.fillStyle = fillStyle;
  }

  public get getCoords(): object {
    return this.coords;
  }

  public get getPrevCoords(): object {
    return this.prevCoords;
  }

  public blast() {
    this.setPrevCoords({x: this.coords.x, y: this.coords.y});
    this.coords.x += randomIntBetween(-10, 10);
    this.coords.y += randomIntBetween(-10, 0);
  }

  private setPrevCoords(coords: ICoords) {
    this.prevCoords = coords;
  }

  private strCoordsSet() {
    this.strCoords = JSON.stringify(this.coords);
  }
};
