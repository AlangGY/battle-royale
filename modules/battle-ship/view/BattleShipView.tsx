import { css } from "@/styled-system/css";
import { BattleShip } from "../model/BattleShip";

export function BattleShipView({ status }: BattleShip) {
  return <div className={battleShipStyle} />;
}

const battleShipStyle = css({
  w: "100%",
  h: "100%",
  rounded: "100%",
  bg: "red",
});
