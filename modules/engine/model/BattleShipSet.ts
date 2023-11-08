import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";

export class BattleShipSet extends ReactiveModel {
  private battleShips: Set<BattleShip> = new Set();

  constructor() {
    super();
  }

  getBattleShips() {
    return [...this.battleShips];
  }

  addBattleShip(battleShip: BattleShip) {
    this.battleShips.add(battleShip);
    this.spreadReactivity(battleShip);
    this.notify();
  }

  removeBattleShip(battleShip: BattleShip) {
    this.battleShips.delete(battleShip);
    this.notify();
  }

  clearBattleShips() {
    this.battleShips.clear();
    this.notify();
  }

  toArray() {
    return Array.from(this.battleShips.values());
  }

  getBattleShipById(id: string) {
    return this.toArray().find((battleShip) => battleShip.id === id);
  }

  effect(): void {
    this.getBattleShips().forEach((battleShip) => battleShip.effect?.());
  }
}
