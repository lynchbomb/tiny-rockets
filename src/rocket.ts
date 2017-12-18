import { ICanvasMeta } from './interfaces/i-canvas-meta';
import { ICoords } from './interfaces/i-coords';
import { IRocketOptions } from './interfaces/i-rocket-options';
import { IVector } from './interfaces/i-vector';
import {
  createVectorR2,
  getDegrees,
  getHeadingDegrees,
  getHeadingRadians,
  getRadians,
  getUnitVectorR2,
  randomIntBetween
} from './utils';
import Vector from './vector';

export default class Rocket implements IRocketOptions {
  public fillStyle: string;
  public width: number;
  public height: number;
  public strCoords: string = '';
  public coords: Vector;
  public prevCoords: Vector;

  public velocity: Vector;
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
    this.velocity = new Vector();
    this.velocity.val.x = 5;
    this.velocity.val.y = 2;
    this.pos = new Vector();
    this.acc = new Vector();

    this.strCoordsSet();
  }

  public applyForce(force: ICoords) {
    this.acc.add(force);
    return this;
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

  public blast(canvasContext: CanvasRenderingContext2D, canvasMeta: ICanvasMeta) {
    this.setPrevCoords(this.coords.val);
    // this.coords.val.x += randomIntBetween(-10, 10);
    // this.coords.val.y += randomIntBetween(-1, 0);

    // canvasContext.translate(this.prevCoords.val.x, this.prevCoords.val.y);

    this.coords.val.x += -1;
    this.coords.val.y += -1;

    // translate to the rocket [i]
    // rotate the rocket [i]
    // canvasContext.rotate(this.getHeadingRadians(this.coords.val));
    // this.rotate(this.heading);
    // this.gravity();
    return this;
  }

  // this is the function to draw at an angle
  public drawRockets(ctx) {
    var r = 20;
    var degrees = 90;

    rockets.forEach((rocket) => {
      var {x,y,d} = rocket;

      ctx.moveTo(x, y);
      ctx.lineWidth = 3;
      ctx.lineTo(x + r * Math.cos(Math.PI * d / 180.0), y + r * Math.sin(Math.PI * d / 180.0));
      ctx.stroke();
    });
  }

  public gravity() {
    this.coords.val.x += this.velocity.val.x;
    this.coords.val.y += this.velocity.val.y;
    this.velocity.val.y *= .99;
    this.velocity.val.y += .25;

    // this.vel.add(this.acc.val);
    // this.pos.add(this.vel.val);
    // this.coords.add(this.vel.val);
    // this.acc.scalar(0);
    this.velocity.limit(this.maxVelocity);
    // console.log('POSITION: ', this.pos.val);
    // console.log('COORDS: ', this.coords.val);
    // console.log('ACC: ', this.acc.val);
    return this;
  }

  public pRotate(angle: number) {
    let r = getRadians(angle);

    // this._renderer.rotate(r);

    return this;
  }

  public rotate(degrees: number, coords: ICoords, width: number, heading?: number): ICoords {
    // TODO: more than likely will need to set the origin point
    // from top-left to center-center
    // !remember to not call the canvas rotate method
    // instead draw the line at the new angle
    // TODO: confirm that x2/y2 doesn't need height

    degrees = getRadians(degrees);

    let x2 = coords.x + width * Math.cos(degrees);
    let y2 = coords.y + width * Math.sin(degrees);

    // ctx.moveTo(x1, y1);
    // ctx.lineTo(x2, y2);

    return {
      x: x2,
      y: y2
    };
  }

  private setPrevCoords(coords: ICoords) {
    this.prevCoords.val = coords;
    return this;
  }

  private strCoordsSet() {
    // TODO prob can get rid of this method
    // dont think its used anywhere
    this.strCoords = JSON.stringify(this.coords);
    return this;
  }
};
