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
  public score: number;
  public probability: number;

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
    // this.vel.add(this.acc.val);
    // this.pos.add(this.vel.val);
    // this.coords.add(this.vel.val);
    // this.acc.scalar(0);
    this.vel.limit(this.maxVelocity);
  
    console.log('VELOCITY: ', this.vel.val);
    // console.log('POSITION: ', this.pos.val);
    // console.log('COORDS: ', this.coords.val);
    // console.log('ACC: ', this.acc.val);
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
    // this.coords.val.x += randomIntBetween(-10, 10);
    // this.coords.val.y += randomIntBetween(-1, 0);

    // this.rotate(this.heading);
    this.coords.val.y += -1;
    this.gravity();
  }

  public rotate(heading: number, degrees: number, coords: ICoords, width: number): ICoords {
    // TODO: more than likely will need to set the origin point
    // from top-left to center-center
    // !remember to not call the canvas rotate method
    // instead draw the line at the new angle
    // TODO: confirm that x2/y2 doesn't need height

    degrees = this.getRadians(degrees);

    let x2 = coords.x + width * Math.cos(degrees);
    let y2 = coords.y + width * Math.sin(degrees);

    // ctx.moveTo(x1, y1);
    // ctx.lineTo(x2, y2);

    return {
      x: x2,
      y: y2
    };
  }

  private getHeadingDegrees(coords: ICoords): number {
    let h = Math.atan2(coords.y, coords.x);

    return this.getDegrees(h);
  }

  private getRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  private getDegrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  private setPrevCoords(coords: ICoords) {
    this.prevCoords.val = coords;
  }

  private strCoordsSet() {
    // TODO prob can get rid of this method
    // dont think its used anywhere
    this.strCoords = JSON.stringify(this.coords);
  }
};
