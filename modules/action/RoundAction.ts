import { Coordinate } from "../engine/model/Coordinate";
import { Player } from "../player/model/Player";

export class RoundAction {
  type: "move" | "attack";
  payload: {
    player: Player;
    coordinate: Coordinate;
  };

  static Move(player: Player, coordinate: Coordinate) {
    return new RoundAction("move", { player, coordinate });
  }

  static Attack(player: Player, coordinate: Coordinate) {
    return new RoundAction("attack", { player, coordinate });
  }

  constructor(
    type: "move" | "attack",
    payload: {
      player: Player;
      coordinate: Coordinate;
    }
  ) {
    this.type = type;
    this.payload = payload;
  }
}
