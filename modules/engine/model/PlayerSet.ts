import { Player } from "@/modules/player/model/Player";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";

export class PlayerSet extends ReactiveModel {
  public players: Set<Player> = new Set();

  constructor() {
    super();
  }

  addPlayer(player: Player) {
    this.players.add(player);
    this.spreadReactivity(player);
    this.notify();
  }

  removePlayer(player: Player) {
    this.players.delete(player);
    this.notify();
  }

  toArray() {
    return Array.from(this.players);
  }

  getMe() {
    return this.toArray().find((player) => player.isMe) ?? undefined;
  }
}
