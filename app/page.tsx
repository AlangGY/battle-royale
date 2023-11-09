"use client";

import { vstack } from "@/styled-system/patterns";
import { css } from "@/styled-system/css";
import { BattleGround } from "@/modules/battle-ground/feature/BattleGround";
import { GridControlView } from "@/modules/battle-ground/view/GridControlView";
import { useGameEngine } from "@/modules/engine/hook/useGameEngine";

export default function Home() {
  const { grid, ships, missileQueue, launchMissile, moveShip } =
    useGameEngine();

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
          onRequestMove={moveShip}
        />
      </div>

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
      <div>
        <button onClick={() => grid.setActionMode("attack")}>Attack</button>
        <button onClick={() => grid.setActionMode("move")}>Move</button>
      </div>
    </main>
  );
}
