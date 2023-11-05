import { css } from "@/styled-system/css";
import { BattleShip } from "../model/BattleShip";

export function BattleShipView({ status, color }: BattleShip) {
  return (
    <svg className={battleShipStyle} style={{ color }}>
      <use href="battle-ship.svg#battle-ship" />
    </svg>
  );
}

const battleShipStyle = css({
  w: "100%",
  h: "100%",
});
