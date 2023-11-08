import { nanoid } from "nanoid";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { Missile } from "./Missile";

export class MissilesQueue extends ReactiveModel {
  private missiles: Missile[] = [];

  constructor() {
    super();
  }

  getMissiles() {
    return this.missiles;
  }

  addMissile(missile: Missile) {
    missile.id = nanoid();
    this.missiles.push(missile);

    this.notify();
  }

  removeMissile(missile: Missile) {
    const index = this.missiles.indexOf(missile);
    if (index > -1) {
      this.missiles.splice(index, 1);
    }
    this.notify();
  }

  clearMissiles() {
    this.missiles = [];
    this.notify();
  }
}
