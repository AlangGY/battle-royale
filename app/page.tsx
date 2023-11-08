"use client";

import { BattleGround } from "@/modules/battle-ground/feature/BattleGround";
import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";
import { BattleShipControlView } from "../modules/battle-ship/view/BattleShipControlView";
import { useShipController } from "../modules/battle-ship/hook/useShipController";
import { GridControlView } from "../modules/battle-ground/view/GridControlView";
import { useGridController } from "../modules/battle-ground/hook/useGridController";
import { vstack } from "@/styled-system/patterns";
import { css } from "@/styled-system/css";
import { MissilesQueue } from "@/modules/missile/model/MissilesQueue";
import { Missile } from "@/modules/missile/model/Missile";

const grid = new BattleGroundGrid([5, 5]);
grid.setActionMode("attack");
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

const missileQueue = new MissilesQueue();

export default function Home() {
  useReactiveModel(...ships, grid, missileQueue);
  const { moveDown, moveLeft, moveRight, moveUp } = useShipController({
    ship: ships[0],
    grid,
  });

  const handleRequestAttack = (coordinate: Coordinate) => {
    missileQueue.addMissile(
      new Missile({
        startCoordinate: ships[0].coordinate,
        targetCoordinate: coordinate,
        color: "red",
      })
    );
  };

  return (
    <main className={vstack()}>
      <div
        className={css({
          height: "60vh",
          aspectRatio: "1/1",
        })}
      >
        <BattleGround
          grid={grid}
          ships={ships}
          missiles={missileQueue}
          onRequestAttack={handleRequestAttack}
        />
      </div>
      <BattleShipControlView
        onDown={moveDown}
        onLeft={moveLeft}
        onRight={moveRight}
        onUp={moveUp}
      />
      <GridControlView
        width={grid.size[0]}
        height={grid.size[1]}
        onHeightChange={(h) => {
          grid.setSize([grid.size[0], h]);
        }}
        onWidthChange={(w) => {
          grid.setSize([w, grid.size[1]]);
        }}
      />
    </main>
  );
}
