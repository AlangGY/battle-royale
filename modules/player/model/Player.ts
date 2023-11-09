import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { PlayerStatus } from "../types";

export class Player extends ReactiveModel {
  public id: string;
  public name: string;
  public color: string;
  public battleShip: BattleShip | null = null;
  public status: PlayerStatus;

  constructor({
    id,
    name,
    color,
  }: {
    id: string;
    name: string;
    color: string;
  }) {
    super();
    this.id = id;
    this.name = name;
    this.color = color;
    this.status = "alive";
  }

  changeName(name: string) {
    this.name = name;
    this.notify();
  }

  setBattleShip(battleShip: BattleShip) {
    this.battleShip = battleShip;
    this.notify();
  }

  removeBattleShip() {
    this.battleShip = null;
    this.notify();
  }

  changeStatus(status: PlayerStatus) {
    this.status = status;
    this.notify();
  }
}
