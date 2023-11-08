import { css } from "@/styled-system/css";
import { useRef } from "react";
import { useEffectOnce } from "react-use";

export function MissileTargetView() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffectOnce(() => {
    const { current: element } = ref;

    const animationKeyframes = [
      { transform: "scale(1)" },
      { transform: "scale(2)" },
      { transform: "scale(1)" },
    ];
    const animationOptions = {
      duration: 1000,
      fill: "forwards",
      easing: "ease-in-out",
      iterations: Infinity,
    } as const;

    const animation = element?.animate(animationKeyframes, animationOptions);
  });

  return <div className={missileTargetStyle} ref={ref} />;
}

const missileTargetStyle = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  border: "1px solid rgba(255, 0, 0, 0.2)",
  boxSizing: "border-box",
  pointerEvents: "none",
  transformOrigin: "center",
  bg: "rgba(255, 0, 0, 0.2)",
});
