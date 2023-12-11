import { css } from "@/styled-system/css";
import { Missile } from "../model/Missile";

interface Props {
  model: Missile;
}

export function MissileView({ model }: Props) {
  return (
    <svg className={missileStyle} style={{ color: model.color }}>
      <use href="/missile.svg#missile" />
    </svg>
  );
}

const missileStyle = css({
  w: "100%",
  h: "100%",
  transition: "transform 0.3s ease-in-out",
});
