import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";

interface MissileConstructorOptions {
  startCoordinate: Coordinate;
  targetCoordinate: Coordinate;
  color: string;
}

export class Missile {
  startCoordinate: Coordinate;
  targetCoordinate: Coordinate;
  color: string;

  constructor({
    startCoordinate,
    targetCoordinate,
    color,
  }: MissileConstructorOptions) {
    this.startCoordinate = startCoordinate;
    this.targetCoordinate = targetCoordinate;
    this.color = color;
  }

  determineBattleShipHit(battleShips: BattleShip[]) {
    return battleShips.some((battleShip) =>
      battleShip.coordinate.isSame(this.targetCoordinate)
    );
  }
}
