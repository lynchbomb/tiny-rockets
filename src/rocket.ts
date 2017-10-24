import { ICoords } from './interfaces/i-coords';
import { IRocketOptions } from './interfaces/i-rocket-options';
import { IVector } from './interfaces/i-vector';
import { createVectorR2, randomIntBetween } from './utils';
import Vector from './vector';

export default class Rocket implements IRocketOptions {
  public fillStyle: string;
  public width: number;
  public height: number;
  public strCoords: string = '';
  public coords: Vector;
  public prevCoords: Vector;

  public vel: Vector;
  public pos: Vector;
  public acc: Vector;

  public heading: number;
  public maxVelocity: number;

  constructor(options: IRocketOptions) {
    this.coords = new Vector();
    this.coords.val = options.val ? options.val : this.coords.val;
    this.prevCoords = new Vector({x: 0, y: 0});
    this.fillStyle = options.fillStyle || 'ff0000';
    this.width = options.width || 1;
    this.height = options.height || 1;

    this.maxVelocity = 4;
    this.vel = new Vector();
    this.pos = new Vector();
    this.acc = new Vector();

    this.strCoordsSet();
  }

  public applyForce(force: ICoords) {
    this.acc.add(force);
  }

  public gravity() {
    this.vel.add(this.acc.val);
    this.pos.add(this.vel.val);
    this.acc.scalar(0);
    this.vel.limit(this.maxVelocity);
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
    this.setPrevCoords(this.coords.val);
    this.coords.val.x += randomIntBetween(-10, 10);
    this.coords.val.y += randomIntBetween(-10, 0);

    // TODO
    // this.rotate(this.heading);
  }

  public rotate(heading: number) {
    // TODO
  }

  private setPrevCoords(coords: ICoords) {
    this.prevCoords.val = coords;
  }

  private strCoordsSet() {
    this.strCoords = JSON.stringify(this.coords);
  }
};
