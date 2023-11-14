import { Coordinate } from "@/modules/engine/model/Coordinate";
import { css } from "@/styled-system/css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  clipPath?: string;
}

export function BattleGroundShipLayerView({ children, style }: Props) {
  return (
    <div style={style} className={battleGroundShipLayerStyle}>
      {children}
    </div>
  );
}

BattleGroundShipLayerView.Item = BattleGroundShipLayerItem;

function BattleGroundShipLayerItem({
  children,
  gridSize,
  coordinate,
  label,
  labelColor,
}: {
  children: React.ReactNode;
  gridSize: [number, number];
  coordinate: Coordinate;
  label?: string;
  labelColor?: string;
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
      {label && (
        <span style={{ color: labelColor ?? "white" }} className={labelStyle}>
          {label}
        </span>
      )}
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
});

const battleGroundShipLayerItemStyle = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "min(1%, 24px)",
  transition: "left 1s ease-in-out, top 1s ease-in-out",
});

const labelStyle = css({
  position: "absolute",
  top: "0",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "1em",
  fontWeight: "bold",
});
