import ICanvasMeta from './interfaces/i-canvas-meta';
import { ICoords } from './interfaces/i-coords';
import IRocketOptions from './interfaces/i-rocket-options';
import IVector from './interfaces/i-vector';
import {
  createVectorR2,
  generateRandomToken,
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
  public id: string;
  public mass: number;
  public velocity: Vector;
  public maxVelocity: number;
  public acceleration: Vector;

  public friction: Vector;
  public gravity: Vector;
  public wind: Vector;

  public forces: [Vector];
  public degrees: number;
  public heading: number;
  public score: number;
  public probability: number;
  public radians: number;

  public cosX: number;
  public sinY: number;

  public dnaCount: number;
  constructor(options: IRocketOptions) {
    this.height = options.height || 5;
    this.radians = randomIntBetween(0, Math.PI * 2);
    this.cosX = Math.cos(this.radians) * this.height;
    this.sinY = Math.sin(this.radians) * this.height;

    // TODO clean this up
    if (options.coords) {
      let _cx = options.coords.val.x;
      let _cy = options.coords.val.y;
      this.prevCoords = new Vector({x: _cx, y: _cy});
      this.coords = new Vector({x: _cx + this.cosX, y: _cy + this.sinY});
    }else {
      this.prevCoords = new Vector({x: this.coords.val.x, y: this.coords.val.y});
      this.coords = new Vector({x: this.prevCoords.val.x + this.cosX, y: this.prevCoords.val.y + this.sinY});
    }
    this.fillStyle = options.fillStyle || 'ff0000';
    this.width = options.width || 1;
    this.mass = options.mass || randomIntBetween(1, 1);
    this.maxVelocity = options.maxVelocity || 1;
    this.velocity = new Vector();
    this.acceleration = new Vector();
    this.acceleration.update({ x: 0.0005, y: 0.0005 });
    this.degrees = getDegrees(randomIntBetween(0, Math.PI * 2));

    // FORCES
    // essentially gravity is some gravitational constant * mass
    this.gravity = new Vector({x: 0, y: 0.3 * this.mass});
    this.friction = new Vector({x: 0.1, y: 0});
    this.wind = new Vector({x: 0.2, y: 0});
    // TODO implement DNA Vector array as a map for each rocket comprised of a random +/- point with random cos/sin
    this.DNA = new DNA();
    this.dnaCount = 0;
    this.forces = [
      this.gravity,
      // this.friction,
      // this.wind
      this.DNA.getVector(this.dnaCount)
    ];

    this.strCoordsSet();
    this.id = generateRandomToken();
  }

  public netForce() {
    let _f = new Vector();
    this.forces.forEach((force) => {
      _f.add(force.val);
    });
    this.applyForce(_f);
  }

  // TODO: a force if a vector that causes an object with mass to accelerate
  // Net Force = Mass * Acceleration
  public applyForce(force: Vector) {
    // zero out acceleration between frames
    this.acceleration.multiFlat(0);
    // acceleration = net force / mass
    force.divideFlat(this.mass);
    this.acceleration.add(force.val);
  }

  public applyKinetics() {
    // this.netForce();

    // TL;DR Newtons three laws of Motion
    // 1. an object at rest stays at rest and an object in motion stays in motion
    this.velocity.add(this.acceleration.val);
    this.velocity.limit(this.maxVelocity);
    return this;
  }

  public blast(canvasContext: CanvasRenderingContext2D, canvasMeta: ICanvasMeta) {
    // canvas coords are top-left origin of 0,0
    // in a 100 x 100 screen going to the center
    // is x: 50, y: 50
    // which then an object at the bottom of the screen would need
    // to move negative to move toward the top of the screen

    this.prevCoords.update(this.coords.val);
    this.applyKinetics();
    // TODO: issue with mult velocity will gradually increase the
    // height of the rocket over time until the maxVelocity ceil
    this.prevCoords.add(this.velocity.val);

    this.coords.val.x += (this.cosX * this.velocity.val.x);
    this.coords.val.y += (this.sinY * this.velocity.val.y);

    // reset the acceleration
    this.acceleration.multiFlat(0);
    // DIRECT
    // this.coords.val.x += this.velocity.val.x;
    // this.coords.val.y += this.velocity.val.y;

    // ANGLED
    // this.coords.val.x += (Math.cos(this.radians) * this.length) * this.velocity.val.x;
    // this.coords.val.y += (Math.sin(this.radians) * this.length) * this.velocity.val.y;

    // LEVERAGING HEADING BASED ON COORDS
    // this.coords.val.x += (Math.cos(getDegrees(this.coords.heading())) * this.velocity.val.x);
    // this.coords.val.y += (Math.sin(getDegrees(this.coords.heading())) * this.velocity.val.y);

    // LEVERAGING HEADING BASED ON VELOCITY
    // this.coords.val.x += (Math.cos(getDegrees(this.velocity.heading())) * this.velocity.val.x);
    // this.coords.val.y += (Math.sin(getDegrees(this.velocity.heading())) * this.velocity.val.y);

    // LEVERAGING ROTATE AND HEADING
    // this.coords.rotate(getDegrees(this.velocity.heading()));

    // TODO: THINK ABOUT POLAR COORDS VS CORTESIAN COORDS

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

  public resetCoords(coords: ICoords) {
    this.coords.update(coords);
    this.radians = randomIntBetween(0, Math.PI * 2);
  }

  private strCoordsSet() {
    this.strCoords = JSON.stringify(this.coords);
    return this;
  }
};
