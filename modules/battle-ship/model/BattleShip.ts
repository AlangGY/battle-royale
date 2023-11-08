import { Coordinate } from "@/modules/engine/model/Coordinate";
import { BattleShipDirection, BattleShipStatus } from "../types";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";

interface BattleShipConstructorOptions {
  maxHealth: number;
  coordinate: Coordinate;
  direction: BattleShipDirection;
  color: string;
}

export class BattleShip extends ReactiveModel {
  public maxHealth: number;
  public health: number;
  public status: BattleShipStatus;
  public coordinate: Coordinate;
  public direction: BattleShipDirection;
  public color: string;

  constructor({
    maxHealth = 5,
    coordinate = new Coordinate({ x: 0, y: 0 }),
    direction = "north",
    color = "blue",
  }: Partial<BattleShipConstructorOptions> = {}) {
    super();
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.status = "alive";
    this.coordinate = coordinate;
    this.direction = direction;
    this.color = color;
  }

  move(coordinate: Coordinate) {
    this.direction = this.determineDirectionOfNextMove(coordinate);
    this.coordinate = coordinate;
    this.notify();
  }

  determineDirectionOfNextMove(coordinate: Coordinate): BattleShipDirection {
    const { x, y } = this.coordinate;
    const { x: nextX, y: nextY } = coordinate;
    if (x === nextX) {
      if (y > nextY) {
        return "north";
      } else {
        return "south";
      }
    } else {
      if (x > nextX) {
        return "west";
      } else {
        return "east";
      }
    }
  }
}
