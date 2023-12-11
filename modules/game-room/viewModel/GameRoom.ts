import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { PlayStatus } from "./PlayStatus";
import { PlayerSet } from "@/modules/game-room/viewModel/PlayerSet";
import { Player } from "@/modules/player/model/Player";
import { RoomResponse } from "@/modules/api/schemas";

export class GameRoom extends ReactiveModel {
  id: string = "";
  name: string = "";
  public status: "joining" | "waiting" | "playing" | "finished" = "playing";
  public winner: string | null = null;
  public playStatus: PlayStatus = new PlayStatus();
  public players: PlayerSet;

  constructor(id?: string, name?: string, players?: Player[]) {
    super();
    this.players = new PlayerSet();
    this.setId(id ?? "");
    this.setName(name ?? "");

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

  private setName(name: string) {
    this.name = name;
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

  static fromGameRoomServerApi(gameRoomResponse: RoomResponse) {
    const gameRoom = new GameRoom(
      gameRoomResponse.id.toString(),
      gameRoomResponse.name,
      gameRoomResponse.players
    );

    return gameRoom;
  }
}
