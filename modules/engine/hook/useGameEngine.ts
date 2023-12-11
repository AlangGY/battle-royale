import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { MissileQueue } from "@/modules/engine/model/MissileQueue";
import { Coordinate } from "../model/Coordinate";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";
import { Missile } from "@/modules/missile/model/Missile";
import { BattleShipSet } from "../model/BattleShipSet";
import { useShipController } from "@/modules/battle-ship/hook/useShipController";
import { Player } from "@/modules/player/model/Player";
import { GameRoom } from "@/modules/game-room/viewModel/GameRoom";
import { RoundAction } from "@/modules/action/RoundAction";
import { useState } from "react";

const grid = new BattleGroundGrid([12, 12]);
grid.setActionMode("move");
const missileQueue = new MissileQueue();
const battleShipSet = new BattleShipSet();

interface Props {
  gameRoom: GameRoom;
}

export function useGameEngine({ gameRoom: { players } }: Props) {
  useReactiveModel(battleShipSet, grid, missileQueue);
  const [controlPlayer, setControlPlayer] = useState<Player | null>(null);
  const { moveShip } = useShipController({
    grid,
  });

  const createBattleShipForPlayer = (player: Player) => {
    if (player.isMe && players.getMe()) return;

    const randomCoordinate = grid.getRandomCoordinate(
      battleShipSet.toArray().map((ship) => ship.coordinate)
    );
    const newBattleShip = new BattleShip({
      coordinate: randomCoordinate,
      owner: player,
    });
    player.setBattleShip(newBattleShip);

    battleShipSet.addBattleShip(newBattleShip);
  };

  const handleRequestAttack = (ship: BattleShip, coordinate: Coordinate) => {
    if (!ship) return;
    const newMissile = new Missile({
      startCoordinate: ship.coordinate,
      targetCoordinate: coordinate,
      owner: ship,
    });

    newMissile.addEventListener("arrival", (missile) => {
      const ship = missile.determineBattleShipHit(battleShipSet.toArray());
      if (ship) {
        ship.hit();
      }
      missileQueue.removeMissile(missile);
    });

    missileQueue.addMissile(newMissile);
  };

  const handleRequestMove = (ship: BattleShip, coordinate: Coordinate) => {
    moveShip(ship, coordinate);
  };

  const handleRoundAction = (action: RoundAction) => {
    const ship = action.payload.player.battleShip;
    const coordinate = action.payload.coordinate;
    if (!ship) return;
    if (action.type === "move") {
      handleRequestMove(ship, coordinate);
    } else {
      handleRequestAttack(ship, coordinate);
    }
  };

  return {
    grid,
    missileQueue,
    battleShipSet,
    handleRoundAction,
    createBattleShipForPlayer,
    setControlPlayer,
    controlPlayer,
  };
}
