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
  onClick,
}: Props) {
  return (
    <button
      className={battleGroundItemStyle({ status, actionMode })}
      disabled={actionMode === "standby"}
      onClick={onClick}
    />
  );
}

const battleGroundItemStyle = cva({
  base: {
    border: "1px solid black",
    rounded: "0",
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
        bg: "rgba(255, 0, 0, 0.05)",
        _hover: {
          bg: "rgba(255, 0, 0, 0.3)",
        },
        _active: {
          bg: "rgba(255, 0, 0, 0.5)",
        },
      },
      move: {
        cursor: "pointer",
        bg: "rgba(0, 0, 255, 0.05)",
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
