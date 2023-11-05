import { Coordinate } from "@/modules/engine/model/Coordinate";
import { css } from "@/styled-system/css";

interface Props {
  children: React.ReactNode;
}

export function BattleGroundShipLayerView({ children }: Props) {
  return <div className={battleGroundShipLayerStyle}>{children}</div>;
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
});

const battleGroundShipLayerItemStyle = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "min(1%, 24px)",
  transition: "left 0.3s ease-in-out, top 0.3s ease-in-out",
});
