export class GameRoomViewModel {
  id: number;
  name: string;
  status: "waiting" | "playing" | "finished";

  constructor(
    id: number,
    name: string,
    status: "waiting" | "playing" | "finished"
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
