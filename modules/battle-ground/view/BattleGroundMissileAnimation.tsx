import { Missile } from "@/modules/missile/model/Missile";
import { MissileView } from "@/modules/missile/view/MissileView";
import { css } from "@/styled-system/css";
import { useEffect, useRef } from "react";

interface Props {
  gridSize: [number, number];
  model: Missile;
  onAnimationEnd?: () => void;
}

export function BattleGroundMissileAnimation({
  gridSize,
  model,
  onAnimationEnd,
}: Props) {
  const [x, y] = gridSize;
  const { startCoordinate, targetCoordinate } = model;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const { current: element } = ref;
    const { x: startX, y: startY } = startCoordinate;
    const { x: targetX, y: targetY } = targetCoordinate;
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

    const transform = `rotate(${angle + 90}deg)`;
    const left = `${(100 * targetX) / x}%`;
    const top = `${(100 * targetY) / y}%`;
    element.style.transform = transform;
    element.style.left = left;
    element.style.top = top;
  }, [startCoordinate, targetCoordinate, x, y]);

  return (
    <div
      ref={ref}
      className={missileContainer}
      style={{
        width: `${100 / x}%`,
        height: `${100 / y}%`,
        left: `${(100 * startCoordinate.x) / x}%`,
        top: `${(100 * startCoordinate.y) / y}%`,
      }}
      onTransitionEnd={onAnimationEnd}
    >
      <MissileView model={model} />
    </div>
  );
}

const missileContainer = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "min(1%, 24px)",
  transition: "left 0.5s ease-in, top 0.5s ease-in, transform 0.5s ease-in",
});
