"use client";

import { BattleGround } from "@/modules/battle-ground/feature/BattleGround";
import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";

const grid = new BattleGroundGrid([5, 5]);
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

export default function Home() {
  useReactiveModel(...ships, grid);

  return (
    <main
      style={{
        width: "500px",
        height: "500px",
      }}
    >
      <BattleGround grid={grid} ships={ships} />
    </main>
  );
}
