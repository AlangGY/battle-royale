import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { PlayStatus } from "./PlayStatus";
import { PlayerSet } from "@/modules/game-room/model/PlayerSet";

export class GameRoom extends ReactiveModel {
  public status: "waiting" | "playing" | "finished" = "playing";
  public winner: string | null = null;
  public playStatus: PlayStatus = new PlayStatus();
  public players: PlayerSet;

  constructor() {
    super();
    this.players = new PlayerSet();
    this.spreadReactivity(this.players);

    this.start = this.start.bind(this);
    this.finish = this.finish.bind(this);
  }

  start() {
    this.status = "playing";
    this.notify();
  }

  finish(winner: string) {
    this.status = "finished";
    this.winner = winner;
    this.notify();
  }
}
