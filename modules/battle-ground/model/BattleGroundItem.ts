interface BattleGroundItemConstructorOptions {
  position: [number, number];
  status: "occupied" | "empty";
}

export class BattleGroundItem {
  position: [number, number];
  status: "occupied" | "empty";

  constructor({
    status = "empty",
    position = [0, 0],
  }: Partial<BattleGroundItemConstructorOptions> = {}) {
    this.status = status;
    this.position = position;
  }
}
