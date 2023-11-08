import { css, cva } from "@/styled-system/css";
import { BattleGroundItem } from "../model/BattleGroundItem";
import { BattleGroundActionMode } from "../types";

interface Props {
  model: BattleGroundItem;
  actionMode?: BattleGroundActionMode;
  onClick?: () => void;
}

export function BattleGroundItemView({
  model: { status },
  actionMode = "standby",
}: Props) {
  return <div className={battleGroundItemStyle({ status, actionMode })} />;
}

const battleGroundItemStyle = cva({
  base: {
    border: "1px solid black",
    zIndex: 1,
  },
  variants: {
    status: {
      occupied: {
        bg: "rgba(0, 0, 0, 0.1)",
      },
      empty: {
        bg: "transparent",
      },
    },
    actionMode: {
      standby: {
        cursor: "default",
      },
      attack: {
        cursor: "pointer",
        _hover: {
          bg: "rgba(255, 0, 0, 0.3)",
        },
        _active: {
          bg: "rgba(255, 0, 0, 0.5)",
        },
      },
      move: {
        cursor: "pointer",
        _hover: {
          bg: "rgba(0, 0, 255, 0.3)",
        },
        _active: {
          bg: "rgba(0, 0, 255, 0.5)",
        },
      },
    },
  },
});
