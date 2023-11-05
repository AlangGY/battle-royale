import { BattleGround } from "@/modules/battle-ground/feature/BattleGround";
import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";

export default function Home() {
  const grid = new BattleGroundGrid([5, 5]);
  const ships = [
    new BattleShip({
      coordinate: new Coordinate({ x: 0, y: 0 }),
    }),
    new BattleShip({
      coordinate: new Coordinate({ x: 1, y: 2 }),
    }),
    new BattleShip({
      coordinate: new Coordinate({ x: 2, y: 1 }),
    }),
  ];

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
