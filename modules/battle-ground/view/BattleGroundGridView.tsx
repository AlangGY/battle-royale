import { css } from "@/styled-system/css";
import { BattleGroundGrid } from "../model/BattleGroundGrid";
import { BattleGroundItemView } from "./BattleGroundItemView";

export function BattleGroundGridView({ blocks }: BattleGroundGrid) {
  const x = blocks[0].length;
  const y = blocks.length;
  console.log(blocks);
  return (
    <div
      className={battleGroundGridStyle}
      style={{
        gridTemplateColumns: `repeat(${x}, fit-content(100%))`,
        gridTemplateRows: `repeat(${y}, fit-content(100%))`,
      }}
    >
      {blocks.map((rows, index) =>
        rows.map((block) => (
          <BattleGroundItemView key={block.position.join(",")} {...block} />
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
