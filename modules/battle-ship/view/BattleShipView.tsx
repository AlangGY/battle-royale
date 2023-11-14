import { css, cva } from "@/styled-system/css";
import { BattleShip } from "../model/BattleShip";
import { useCallback, useEffect, useRef } from "react";
import { container } from "@/styled-system/patterns";
import { useLatest } from "react-use";

interface Props {
  model: BattleShip;
  onDeadAnimationEnd?: () => void;
}

export function BattleShipView({
  model: { status, direction, color },
  onDeadAnimationEnd,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onDeadAnimationEndCbRef = useLatest(onDeadAnimationEnd);

  const animateFloating = useCallback(
    (element: HTMLDivElement) => {
      const isVertical = () => {
        switch (direction) {
          case "north":
          case "south":
            return true;
          default:
            return false;
        }
      };

      const translate = isVertical() ? "translateX" : "translateY";

      const floatingKeyframes = [
        { transform: `${translate}(0)` },
        { transform: `${translate}(-5px)` },
        { transform: `${translate}(0)` },
        { transform: `${translate}(5px)` },
        { transform: `${translate}(0)` },
      ];

      const floatingOptions = {
        duration: 5000,
        iterations: Infinity,
        easing: "ease",
      } as const;

      return element.animate(floatingKeyframes, floatingOptions);
    },
    [direction]
  );

  const animateDead = useCallback(
    (element: HTMLDivElement) => {
      const isVertical = () => {
        switch (direction) {
          case "north":
          case "south":
            return true;
          default:
            return false;
        }
      };

      const sinkDirection = () => {
        switch (direction) {
          case "north":
          case "west":
          case "east":
            return 1;
          case "south":
            return -1;
        }
      };

      const translate = isVertical() ? "translateX" : "translateY";

      const deadKeyframes = [
        { transform: `${translate}(0)` },
        { transform: `${translate}(${sinkDirection() * 50}%)`, opacity: 0 },
      ];

      const deadOptions = {
        duration: 1000,
        fill: "forwards",
        easing: "ease",
      } as const;

      return element.animate(deadKeyframes, deadOptions);
    },
    [direction]
  );

  useEffect(() => {
    const { current: element } = ref;
    if (!element) return;
    let animation: Animation;
    switch (status) {
      case "alive":
        animation = animateFloating(element);
        break;
      case "dead":
        new Audio("battle-ship-destroy.mp3").play();
        animation = animateDead(element);
        animation.onfinish = () => {
          onDeadAnimationEndCbRef.current?.();
        };
        break;
    }

    return () => {
      animation.cancel();
    };
  }, [animateDead, animateFloating, status, onDeadAnimationEndCbRef]);

  return (
    <div
      ref={ref}
      className={css({
        w: "100%",
        h: "100%",
      })}
    >
      <svg
        className={battleShipStyle({ direction })}
        style={{ color: status === "alive" ? color : "#000000" }}
      >
        <use href="battle-ship.svg#battle-ship" />
      </svg>
    </div>
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
