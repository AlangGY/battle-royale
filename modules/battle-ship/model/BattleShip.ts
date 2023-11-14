import { Coordinate } from "@/modules/engine/model/Coordinate";
import { BattleShipDirection, BattleShipStatus } from "../types";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { Player } from "@/modules/player/model/Player";

interface BattleShipConstructorOptions {
  maxHealth?: number;
  coordinate?: Coordinate;
  direction?: BattleShipDirection;
  color?: string;
  owner: Player;
}

export class BattleShip extends ReactiveModel {
  public maxHealth: number;
  public health: number;
  public status: BattleShipStatus;
  public coordinate: Coordinate;
  public direction: BattleShipDirection;
  public moveRange: number = 3;
  public viewRange: number = 2;
  public color: string;
  public owner: Player;

  constructor({
    maxHealth = 1,
    coordinate = new Coordinate({ x: 0, y: 0 }),
    direction = "east",
    color = "blue",
    owner,
  }: BattleShipConstructorOptions) {
    super();
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.status = "alive";
    this.coordinate = coordinate;
    this.direction = direction;
    this.color = owner?.color ?? color;
    this.owner = owner;
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

  hit() {
    this.health -= 1;
    this.notify();
  }

  die() {
    this.status = "dead";
    this.notify();
  }

  effect() {
    if (this.status === "alive" && this.health <= 0) {
      this.die();
    }
  }

  isMovableCoordinate(coordinate: Coordinate): boolean {
    const { x, y } = this.coordinate;
    const { x: nextX, y: nextY } = coordinate;
    return (
      !this.coordinate.isSame(coordinate) &&
      Math.abs(nextX - x) + Math.abs(nextY - y) <= this.moveRange
    );
  }
}
