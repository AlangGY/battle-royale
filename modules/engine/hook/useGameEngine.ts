import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { MissileQueue } from "@/modules/engine/model/MissileQueue";
import { Coordinate } from "../model/Coordinate";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";
import { Missile } from "@/modules/missile/model/Missile";
import { BattleShipSet } from "../model/BattleShipSet";
import { useShipController } from "@/modules/battle-ship/hook/useShipController";
import { PlayerSet } from "../model/PlayerSet";
import { Player } from "@/modules/player/model/Player";

const grid = new BattleGroundGrid([12, 12]);
grid.setActionMode("move");
const missileQueue = new MissileQueue();
const battleShipSet = new BattleShipSet();
const playerSet = new PlayerSet();

export function useGameEngine() {
  useReactiveModel(battleShipSet, grid, missileQueue, playerSet);
  const myShip = playerSet.getMe()?.battleShip;
  const { moveShip } = useShipController({
    ship: myShip,
    grid,
  });

  const createPlayer = (
    id: string,
    name: string,
    color: string,
    isMe: boolean = false
  ) => {
    if (isMe && playerSet.getMe()) return;
    const newPlayer = new Player({ id, name, color, isMe });
    const randomCoordinate = grid.getRandomCoordinate(
      battleShipSet.toArray().map((ship) => ship.coordinate)
    );
    const newBattleShip = new BattleShip({
      coordinate: randomCoordinate,
      color,
    });
    newPlayer.setBattleShip(newBattleShip);
    playerSet.addPlayer(newPlayer);
    battleShipSet.addBattleShip(newBattleShip);
  };

  const handleRequestAttack = (coordinate: Coordinate) => {
    if (!myShip) return;
    const newMissile = new Missile({
      startCoordinate: myShip.coordinate,
      targetCoordinate: coordinate,
      color: myShip.color,
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

  const handleRequestMove = (coordinate: Coordinate) => {
    moveShip(coordinate);
  };

  return {
    grid,
    missileQueue,
    battleShipSet,
    myShip,
    launchMissile: handleRequestAttack,
    moveShip: handleRequestMove,
    createPlayer,
  };
}
