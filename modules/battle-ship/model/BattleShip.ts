import { BattleShipStatus } from "../types";

interface BattleShipConstructorOptions {
  maxHealth: number;
  position: [number, number];
}

export class BattleShip {
  public maxHealth: number;
  public health: number;
  public status: BattleShipStatus;
  public position: [number, number];

  constructor({
    maxHealth = 5,
    position = [0, 0],
  }: Partial<BattleShipConstructorOptions>) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.status = "alive";
    this.position = position;
  }
}
