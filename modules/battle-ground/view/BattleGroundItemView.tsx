import { css, cva } from "@/styled-system/css";
import { BattleGroundItem } from "../model/BattleGroundItem";

export function BattleGroundItemView({ status }: BattleGroundItem) {
  return <div className={battleGroundItemStyle({ status })} />;
}

const battleGroundItemStyle = cva({
  base: {
    w: "100px",
    h: "100px",
    border: "1px solid black",
  },
  variants: {
    status: {
      occupied: {
        bg: "rgba(0, 0, 0, 0.1)",
      },
      empty: {
        bg: "white",
      },
    },
  },
});
