import { css, cva } from "@/styled-system/css";
import { BattleShip } from "../model/BattleShip";

export function BattleShipView({ status, direction, color }: BattleShip) {
  return (
    <svg className={battleShipStyle({ direction })} style={{ color }}>
      <use href="battle-ship.svg#battle-ship" />
    </svg>
  );
}

const battleShipStyle = cva({
  base: {
    w: "100%",
    h: "100%",
    transition: "transform 0.3s ease-in-out",
  },
  variants: {
    direction: {
      north: {
        transform: "rotate(-90deg)",
      },
      east: {
        transform: "rotate(0deg)",
      },
      south: {
        transform: "rotate(90deg)",
      },
      west: {
        transform: "scaleX(-1)",
      },
    },
  },
});
