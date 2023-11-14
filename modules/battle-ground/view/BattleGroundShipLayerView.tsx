import { Coordinate } from "@/modules/engine/model/Coordinate";
import { css } from "@/styled-system/css";

interface Props {
  children: React.ReactNode;
  clipPath?: string;
}

export function BattleGroundShipLayerView({ children, clipPath }: Props) {
  return (
    <div style={{ clipPath }} className={battleGroundShipLayerStyle}>
      {children}
    </div>
  );
}

BattleGroundShipLayerView.Item = BattleGroundShipLayerItem;

function BattleGroundShipLayerItem({
  children,
  gridSize,
  coordinate,
}: {
  children: React.ReactNode;
  gridSize: [number, number];
  coordinate: Coordinate;
}) {
  const [x, y] = gridSize;

  return (
    <div
      className={battleGroundShipLayerItemStyle}
      style={{
        width: `${100 / x}%`,
        height: `${100 / y}%`,
        left: `${(100 * coordinate.x) / x}%`,
        top: `${(100 * coordinate.y) / y}%`,
      }}
    >
      {children}
    </div>
  );
}

const battleGroundShipLayerStyle = css({
  w: "100%",
  h: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  transition: "clip-path 1s ease-in-out",
  bg: "rgba(255, 255, 255, 0.2)",
});

const battleGroundShipLayerItemStyle = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "min(1%, 24px)",
  transition: "left 1s ease-in-out, top 1s ease-in-out",
});
