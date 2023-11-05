import { Coordinate } from "@/modules/engine/model/Coordinate";
import { BattleShipStatus } from "../types";

interface BattleShipConstructorOptions {
  maxHealth: number;
  coordinate: Coordinate;
}

export class BattleShip {
  public maxHealth: number;
  public health: number;
  public status: BattleShipStatus;
  public coordinate: Coordinate;

  constructor({
    maxHealth = 5,
    coordinate = new Coordinate({ x: 0, y: 0 }),
  }: Partial<BattleShipConstructorOptions> = {}) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.status = "alive";
    this.coordinate = coordinate;
  }
}
