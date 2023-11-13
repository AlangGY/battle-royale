import { useEffect, useLayoutEffect, useRef } from "react";
import { useLatest } from "react-use";
import { Missile } from "@/modules/missile/model/Missile";
import { MissileView } from "@/modules/missile/view/MissileView";
import { css } from "@/styled-system/css";
import { MissileTargetView } from "@/modules/missile/view/MissileTargetView";

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

  const animationEndCbRef = useLatest(onAnimationEnd);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const { current: element } = ref;
    const { x: startX, y: startY } = startCoordinate;
    const { x: targetX, y: targetY } = targetCoordinate;
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
    const velocity = Math.sqrt(deltaX ** 2 + deltaY ** 2) * 5;
    const length = Math.sqrt(x ** 2 + y ** 2);
    const duration = velocity / length;

    const rotateKeyframes = [
      { transform: "rotate(0deg)" },
      { transform: `rotate(${angle + 90}deg)` },
    ];
    const rotationOptions = {
      duration: 500,
      fill: "forwards",
      easing: "ease-in-out",
    } as const;

    const fireKeyframes = [
      {
        transform: `scale(1) rotate(${angle + 90}deg)`,
        left: `${(100 * startX) / x}%`,
        top: `${(100 * startY) / y}%`,
      },
      {
        transform: `scale(${length / 4}) rotate(${angle + 90}deg)`,
      },
      {
        transform: `scale(1) rotate(${angle + 90}deg)`,
        left: `${(100 * targetX) / x}%`,
        top: `${(100 * targetY) / y}%`,
      },
    ];
    const fireOptions = {
      duration: duration * 800,
      fill: "forwards",
      easing: "ease-in-out",
    } as const;

    let rotateAnimation: Animation;
    let fireAnimation: Animation;
    requestAnimationFrame(() => {
      rotateAnimation = element.animate(rotateKeyframes, rotationOptions);
      rotateAnimation.onfinish = () => {
        fireAnimation = element.animate(fireKeyframes, fireOptions);
        fireAnimation.onfinish = animationEndCbRef.current ?? null;
      };
    });
    return () => {
      rotateAnimation?.cancel();
      fireAnimation?.cancel();
    };
  }, [startCoordinate, targetCoordinate, x, y, animationEndCbRef]);

  return (
    <>
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
      <div
        className={missileTargetContainer}
        style={{
          width: `${100 / x}%`,
          height: `${100 / y}%`,
          left: `${(100 * targetCoordinate.x) / x}%`,
          top: `${(100 * targetCoordinate.y) / y}%`,
          transform: "scale(0.5)",
        }}
      >
        <MissileTargetView />
      </div>
    </>
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

const missileTargetContainer = css({
  position: "absolute",
});
