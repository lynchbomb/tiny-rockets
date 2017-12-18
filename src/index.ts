import Genetics from './genetics';
import { ICanvasMeta } from './interfaces/i-canvas-meta';
import { ICoords } from './interfaces/i-coords';
import { IGeneticsItem } from './interfaces/i-genetics';
import { IRocketOptions } from './interfaces/i-rocket-options';
import Rocket from './rocket';
import { randomIntBetween } from './utils';
import Vector from './vector';

class TinyRockets {
  public FPS_THROTTLE: null | number = 10;
  public IS_PAUSED: boolean = false;
  public rocketsCount: number = 5;
  public rocketWidth: number = 1;
  public rocketHeight: number = 3;

  public rockets: Array<[Rocket]> | any = [];
  public $canvas = document.getElementById('canvas') as HTMLCanvasElement;
  public canvasContext = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
  public canvasMeta: ICanvasMeta = {
    canvasWidth: 0,
    canvasHeight: 0,
    canvasScaleWidth: this.rocketWidth,
    canvasScaleHeight: this.rocketHeight,
    canvasCenterX: 0,
    canvasCenterY: 0,
    canvasScalarHeight: 0,
    canvasScalarWidth: 0
  };

  public genetics: Genetics;

  constructor() {
    this.initCanvas();
    this.initRockets();
    this.initGenetics(this.rockets);
    this.initRenderRockets();
    this.update();
  }

  public initCanvas() {
    this.canvasMeta.canvasWidth = this.$canvas.width;
    this.canvasMeta.canvasHeight = this.$canvas.height;
    this.canvasMeta.canvasCenterX = (this.canvasMeta.canvasWidth / this.canvasMeta.canvasScaleWidth) / 2;
    this.canvasMeta.canvasCenterY = (this.canvasMeta.canvasHeight / this.canvasMeta.canvasScaleHeight) / 2;
    this.canvasMeta.canvasScalarHeight = (this.canvasMeta.canvasHeight / this.canvasMeta.canvasScaleHeight);
    this.canvasMeta.canvasScalarWidth = (this.canvasMeta.canvasWidth / this.canvasMeta.canvasScaleWidth);
    this.canvasContext.scale(this.canvasMeta.canvasScaleWidth, this.canvasMeta.canvasScaleHeight);
  }

  public initRockets() {
    for (let i = 0; i < this.rocketsCount; i++) {
      this.rockets.push(new Rocket({
        val: { x: randomIntBetween(0, this.canvasMeta.canvasScalarWidth), y: this.canvasMeta.canvasScalarHeight },
        width: this.rocketWidth,
        height: this.rocketHeight
      }));
    }
  }

  public initGenetics(currentGeneration: [IGeneticsItem]) {
    this.genetics = new Genetics(currentGeneration);
  }

  public initRenderRockets() {
    for (let i = 0; i < this.rockets.length; i++) {
      this.renderRocket(this.rockets[i]);
    }
  }

  /********************************************
  *********************************************

  [ ALL METHODS BELOW ARE RUNNING AT ~60 FPS!! ]

  *********************************************
  *********************************************/

  public update() {
    if (this.IS_PAUSED) { return; }

    this.blastRockets(this.canvasContext, this.canvasMeta);

    if (this.FPS_THROTTLE) {
      setTimeout(() => {
        window.requestAnimationFrame(this.update.bind(this));
      }, 1000 / this.FPS_THROTTLE);
    }else {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }

  // TODO: test and confirm logic
  public isOOB(rocket: Rocket) {
    if (rocket.coords.val.y + rocket.velocity.val.y > this.canvasMeta.canvasHeight || rocket.coords.val.y + rocket.velocity.val.y < 0) {
      // rocket.velocity.val.y = -rocket.velocity.val.y;
      return true;
    } else if (rocket.coords.val.x + rocket.velocity.val.x > this.canvasMeta.canvasWidth || rocket.coords.val.x + rocket.velocity.val.x < 0) {
      // rocket.velocity.val.x = -rocket.velocity.val.x;
      return true;
    } else {
      return false;
    }
  }

  public blastRockets(canvasContext: CanvasRenderingContext2D, canvasMeta: ICanvasMeta) {
    this.clearCanvas();

    for (let i = 0; i < this.rockets.length; i++) {
      this.rockets[i].blast(this.canvasContext, this.canvasMeta);
      // this.clearCanvasRocket(this.rockets[i]);
      this.renderRocket(this.rockets[i]);
    }
  }

  public renderRocket(rocket: Rocket): Rocket {
    this.canvasContext.fillStyle = rocket.fillStyle;
    this.canvasContext.fillRect(rocket.coords.val.x, rocket.coords.val.y, rocket.width, rocket.height);

    this.canvasContext.restore();
    return rocket;
  }

  public clearCanvas(x: number = 0, y: number = 0, width: number = this.canvasMeta.canvasWidth, height: number = this.canvasMeta.canvasHeight): boolean {
    this.canvasContext.clearRect(x, y, width, height);

    return true;
  }

  public clearCanvasRocket(rocket: Rocket): boolean {
    this.clearCanvas(rocket.prevCoords.val.x, rocket.prevCoords.val.y, rocket.width, rocket.height);

    return true;
  }
};
