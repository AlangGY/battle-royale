import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";

interface MissileConstructorOptions {
  startCoordinate: Coordinate;
  targetCoordinate: Coordinate;
  owner: BattleShip;
}

type MissileEventName = "arrival";

export class Missile {
  id?: string;
  owner: BattleShip;
  startCoordinate: Coordinate;
  targetCoordinate: Coordinate;
  color: string;
  onArrival?: (missile: this) => void;

  constructor({
    startCoordinate,
    targetCoordinate,
    owner,
  }: MissileConstructorOptions) {
    this.startCoordinate = startCoordinate;
    this.targetCoordinate = targetCoordinate;
    this.owner = owner;
    this.color = owner.color;

    this.dispatchEvent = this.dispatchEvent.bind(this);
  }

  determineBattleShipHit(battleShips: BattleShip[]) {
    return battleShips.find((battleShip) =>
      battleShip.coordinate.isSame(this.targetCoordinate)
    );
  }

  addEventListener(
    eventName: MissileEventName,
    callback: (missile: this) => void
  ) {
    if (eventName === "arrival") {
      this.onArrival = callback;
    }
  }

  dispatchEvent(eventName: MissileEventName) {
    if (eventName === "arrival") {
      this.onArrival?.(this);
    }
  }
}
