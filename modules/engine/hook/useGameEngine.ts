import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { MissileQueue } from "@/modules/engine/model/MissileQueue";
import { Coordinate } from "../model/Coordinate";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";
import { Missile } from "@/modules/missile/model/Missile";

const grid = new BattleGroundGrid([5, 5]);
const missileQueue = new MissileQueue();
const ships = [
  new BattleShip({
    coordinate: new Coordinate({ x: 0, y: 0 }),
    color: "red",
  }),
  new BattleShip({
    coordinate: new Coordinate({ x: 1, y: 2 }),
    color: "blue",
  }),
  new BattleShip({
    coordinate: new Coordinate({ x: 2, y: 1 }),
    color: "green",
  }),
];

export function useGameEngine() {
  useReactiveModel(...ships, grid, missileQueue);

  const handleRequestAttack = (coordinate: Coordinate) => {
    missileQueue.addMissile(
      new Missile({
        startCoordinate: ships[0].coordinate,
        targetCoordinate: coordinate,
        color: "red",
      })
    );
  };

  return {
    grid,
    missileQueue,
    ships,
    launchMissile: handleRequestAttack,
  };
}
