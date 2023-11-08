import { css } from "@/styled-system/css";
import { BattleGroundGrid } from "../model/BattleGroundGrid";
import { BattleGroundItemView } from "./BattleGroundItemView";
import { Coordinate } from "@/modules/engine/model/Coordinate";
import { on } from "events";

interface Props {
  model: BattleGroundGrid;
  onClick?: (coordinate: Coordinate) => void;
}

export function BattleGroundGridView({
  model: { blocks, actionMode },
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
            actionMode={actionMode}
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
