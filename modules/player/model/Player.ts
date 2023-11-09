import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { PlayerStatus } from "../types";

interface PlayerConstructorOptions {
  id: string;
  name: string;
  color: string;
  isMe?: boolean;
}

export class Player extends ReactiveModel {
  public id: string;
  public name: string;
  public color: string;
  public battleShip?: BattleShip;
  public isMe: boolean;
  public status: PlayerStatus;

  constructor({ id, name, color, isMe = false }: PlayerConstructorOptions) {
    super();
    this.id = id;
    this.name = name;
    this.color = color;
    this.status = "alive";
    this.isMe = isMe;
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
    this.battleShip = undefined;
    this.notify();
  }

  changeStatus(status: PlayerStatus) {
    this.status = status;
    this.notify();
  }
}
