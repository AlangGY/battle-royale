import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { PlayStatus } from "./PlayStatus";
import { PlayerSet } from "@/modules/game-room/model/PlayerSet";
import { Player } from "@/modules/player/model/Player";

export class GameRoom extends ReactiveModel {
  private id: string = "";
  public status: "joining" | "waiting" | "playing" | "finished" = "playing";
  public winner: string | null = null;
  public playStatus: PlayStatus = new PlayStatus();
  public players: PlayerSet;
  private gameRoomServerApi: any;

  constructor() {
    super();
    this.players = new PlayerSet();
    this.spreadReactivity(this.players);

    this.start = this.start.bind(this);
    this.finish = this.finish.bind(this);
  }

  start(roomId: string) {
    this.status = "playing";
    this.setId(roomId);
    this.notify();
  }

  finish(winner: string) {
    this.status = "finished";
    this.winner = winner;
    this.notify();
  }

  private setId(id: string) {
    this.id = id;
  }

  joinRoom(player: Player) {
    if (this.players.toArray().every((p) => p.id !== player.id)) {
      this.players.addPlayer(player);
    }
  }

  requestJoinRoom(playerId: string) {
    // TODO: server에 방 참가 요청
  }

  onJoinRoomNotification(player: Player) {
    // TODO: server로부터 방 참가 통보
    this.joinRoom(player);
  }
}
