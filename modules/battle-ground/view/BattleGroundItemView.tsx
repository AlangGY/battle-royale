import { css, cva } from "@/styled-system/css";
import { BattleGroundItem } from "../model/BattleGroundItem";

interface Props {
  model: BattleGroundItem;
}

export function BattleGroundItemView({ model: { status } }: Props) {
  return <div className={battleGroundItemStyle({ status })} />;
}

const battleGroundItemStyle = cva({
  base: {
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
