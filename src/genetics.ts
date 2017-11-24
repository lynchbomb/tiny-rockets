import { ICoords } from './interfaces/i-coords';
import { IGeneticsItem } from './interfaces/i-genetics';
import { createVectorR2, randomIntBetween } from './utils';

export default class Genetics {
  // confirm if this should be a generation of IGeneticsItem or a Rocket

  public curGeneration: [IGeneticsItem];
  public preGeneration: [IGeneticsItem];

  constructor(curGeneration: [IGeneticsItem]) {
    this.cycleGeneration(curGeneration);
  }

  // bumps the current generation to previous
  // and adds the new generation to current
  public cycleGeneration(generation: [IGeneticsItem]) {
    this.preGeneration = this.curGeneration;
    this.curGeneration = generation;
  }

  // get the distance between a set of 2 dimensional vectors
  public getDistanceBetweenR2Vectors(V1: ICoords, V2: ICoords) {
    let _deltaV: ICoords = {
      x: V1.x - V2.x,
      y: V1.y - V2.y
    };

    return Math.sqrt(Math.pow(_deltaV.x, 2) + Math.pow(_deltaV.y, 2));
  }

  // TODO: confirm this math checks out
  public getScore(vector: ICoords, targetVector: ICoords, originVector: ICoords): number {
    let _originFromTarget = this.getDistanceBetweenR2Vectors(originVector, targetVector);
    let _unitFromTarget = this.getDistanceBetweenR2Vectors(vector, targetVector);

    return (1 - (_unitFromTarget / _originFromTarget)) * (100);
  }

  // to be run every time a new population is generated
  // the goal being the highest probablity will go to
  // parents with the highest score all while still
  // allowing generations from lower scoring parents
  public getProbablity(a: [number]): [number] {
    let sum: number = a.reduce((n1, n2) => n1 + n2);
    let prob: any = [];

    a.forEach((score) => {
      prob.push(score / sum * 100);
    });

    return prob;
  }
};
