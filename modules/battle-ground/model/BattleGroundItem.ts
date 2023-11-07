import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";

interface BattleGroundItemConstructorOptions {
  position: [number, number];
  status: "occupied" | "empty";
}

export class BattleGroundItem extends ReactiveModel {
  position: [number, number];
  status: "occupied" | "empty";

  constructor({
    status = "empty",
    position = [0, 0],
  }: Partial<BattleGroundItemConstructorOptions> = {}) {
    super();
    this.status = status;
    this.position = position;
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
