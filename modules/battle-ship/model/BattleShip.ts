import { Coordinate } from "@/modules/engine/model/Coordinate";
import { BattleShipStatus } from "../types";

interface BattleShipConstructorOptions {
  maxHealth: number;
  coordinate: Coordinate;
  color: string;
}

export class BattleShip {
  public maxHealth: number;
  public health: number;
  public status: BattleShipStatus;
  public coordinate: Coordinate;
  public color: string;

  constructor({
    maxHealth = 5,
    coordinate = new Coordinate({ x: 0, y: 0 }),
    color = "blue",
  }: Partial<BattleShipConstructorOptions> = {}) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.status = "alive";
    this.coordinate = coordinate;
    this.color = color;
  }
}
