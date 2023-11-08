"use client";

import { vstack } from "@/styled-system/patterns";
import { css } from "@/styled-system/css";
import { BattleGround } from "@/modules/battle-ground/feature/BattleGround";
import { BattleShipControlView } from "@/modules/battle-ship/view/BattleShipControlView";
import { useShipController } from "@/modules/battle-ship/hook/useShipController";
import { GridControlView } from "@/modules/battle-ground/view/GridControlView";
import { useGameEngine } from "@/modules/engine/hook/useGameEngine";

export default function Home() {
  const { grid, ships, missileQueue, launchMissile } = useGameEngine();
  const { moveDown, moveLeft, moveRight, moveUp } = useShipController({
    ship: ships[0],
    grid,
  });

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
          onRequestAttack={launchMissile}
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
