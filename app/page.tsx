"use client";

import { flex, vstack } from "@/styled-system/patterns";
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
          height: "80vh",
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
      <div
        className={flex({
          gap: 5,
        })}
      >
        <button
          style={{
            backgroundColor:
              grid.actionMode === "attack"
                ? "rgba(255,0,0,0.6)"
                : "transparent",
          }}
          onClick={() => grid.setActionMode("attack")}
        >
          Attack
        </button>
        <button
          style={{
            backgroundColor:
              grid.actionMode === "move" ? "rgba(0,0,255,0.6)" : "transparent",
          }}
          onClick={() => grid.setActionMode("move")}
        >
          Move
        </button>
      </div>
    </main>
  );
}
