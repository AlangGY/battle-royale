import { hstack } from "@/styled-system/patterns";

interface Props {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
}

export function BattleShipControlView({
  onUp,
  onDown,
  onLeft,
  onRight,
}: Props) {
  return (
    <div
      className={hstack({
        justifyContent: "center",
      })}
    >
      <button onClick={onUp}>Up</button>
      <button onClick={onDown}>Down</button>
      <button onClick={onLeft}>Left</button>
      <button onClick={onRight}>Right</button>
    </div>
  );
}
