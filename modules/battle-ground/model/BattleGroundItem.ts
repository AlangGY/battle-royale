import { Coordinate } from "@/modules/engine/model/Coordinate";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";

interface BattleGroundItemConstructorOptions {
  coordinate: Coordinate;
  status: "occupied" | "empty";
}

export class BattleGroundItem extends ReactiveModel {
  coordinate: Coordinate;
  status: "occupied" | "empty";

  constructor({
    status = "empty",
    coordinate = new Coordinate({ x: 0, y: 0 }),
  }: Partial<BattleGroundItemConstructorOptions> = {}) {
    super();
    this.status = status;
    this.coordinate = coordinate;
  }

  occupy() {
    if (this.status === "occupied") return;
    this.status = "occupied";
    this.notify();
  }

  empty() {
    if (this.status === "empty") return;
    this.status = "empty";
    this.notify();
  }
}
