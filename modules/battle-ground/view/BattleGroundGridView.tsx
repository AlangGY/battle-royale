import { css } from "@/styled-system/css";
import { BattleGroundGrid } from "../model/BattleGroundGrid";
import { BattleGroundItemView } from "./BattleGroundItemView";

interface Props {
  model: BattleGroundGrid;
}

export function BattleGroundGridView({ model: { blocks } }: Props) {
  const x = blocks[0].length;
  const y = blocks.length;
  return (
    <div
      className={battleGroundGridStyle}
      style={{
        gridTemplateColumns: `repeat(${x}, 1fr)`,
        gridTemplateRows: `repeat(${y}, 1fr)`,
      }}
    >
      {blocks.map((rows, index) =>
        rows.map((block) => (
          <BattleGroundItemView key={block.position.join(",")} model={block} />
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
