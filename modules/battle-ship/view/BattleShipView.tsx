import { css } from "@/styled-system/css";
import { BattleShip } from "../model/BattleShip";

export function BattleShipView({ status }: BattleShip) {
  return <div className={battleShipStyle} />;
}

const battleShipStyle = css({
  w: "100px",
  h: "100px",
  rounded: "100%",
  bg: "red",
});
