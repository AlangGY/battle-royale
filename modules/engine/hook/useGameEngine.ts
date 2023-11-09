import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { MissileQueue } from "@/modules/engine/model/MissileQueue";
import { Coordinate } from "../model/Coordinate";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";
import { Missile } from "@/modules/missile/model/Missile";
import { BattleShipSet } from "../model/BattleShipSet";
import { useShipController } from "@/modules/battle-ship/hook/useShipController";

const grid = new BattleGroundGrid([12, 12]);
grid.setActionMode("move");
const missileQueue = new MissileQueue();
const battleShipSet = new BattleShipSet();
battleShipSet.addBattleShip(
  new BattleShip({
    coordinate: new Coordinate({ x: 0, y: 0 }),
    color: "red",
  })
);
battleShipSet.addBattleShip(
  new BattleShip({
    coordinate: new Coordinate({ x: 8, y: 1 }),
    color: "blue",
  })
);
battleShipSet.addBattleShip(
  new BattleShip({
    coordinate: new Coordinate({ x: 5, y: 10 }),
    color: "green",
  })
);

export function useGameEngine() {
  useReactiveModel(battleShipSet, grid, missileQueue);
  const { moveShip } = useShipController({
    ship: battleShipSet.toArray()[0],
    grid,
  });

  const ships = battleShipSet.toArray();

  const handleRequestAttack = (coordinate: Coordinate) => {
    const newMissile = new Missile({
      startCoordinate: ships[0].coordinate,
      targetCoordinate: coordinate,
      color: ships[0].color,
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
    ships,
    launchMissile: handleRequestAttack,
    moveShip: handleRequestMove,
  };
}
