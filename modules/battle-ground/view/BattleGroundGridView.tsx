import { css } from "@/styled-system/css";
import { BattleGroundGrid } from "../model/BattleGroundGrid";
import { BattleGroundItemView } from "./BattleGroundItemView";
import { Coordinate } from "@/modules/engine/model/Coordinate";
import { on } from "events";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";

interface Props {
  model: BattleGroundGrid;
  myBattleShip?: BattleShip;
  onClick?: (coordinate: Coordinate) => void;
}

export function BattleGroundGridView({
  model: { blocks, actionMode },
  myBattleShip,
  onClick,
}: Props) {
  const x = blocks[0].length;
  const y = blocks.length;

  return (
    <div
      className={battleGroundGridStyle}
      style={{
        gridTemplateColumns: `repeat(${y}, 1fr)`,
        gridTemplateRows: `repeat(${x}, 1fr)`,
      }}
    >
      {blocks.map((rows) =>
        rows.map((block) => (
          <BattleGroundItemView
            model={block}
            key={block.coordinate.toString()}
            actionMode={
              actionMode === "move"
                ? myBattleShip?.isMovableCoordinate(block.coordinate)
                  ? "move"
                  : "standby"
                : actionMode
            }
            onClick={() => {
              onClick?.(block.coordinate);
            }}
          />
        ))
      )}
    </div>
  );
}

const battleGroundGridStyle = css({
  display: "grid",
  gap: "2px",
  w: "100%",
  h: "100%",
});
