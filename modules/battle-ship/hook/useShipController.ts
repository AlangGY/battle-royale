import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";

interface Props {
  grid: BattleGroundGrid;
}

export function useShipController({ grid }: Props) {
  const { size } = grid;
  const [xWidth, yWidth] = size;

  const isShipInGrid = (x: number, y: number) => {
    return x >= 0 && x < xWidth && y >= 0 && y < yWidth;
  };

  const moveShip = (ship: BattleShip | null, coordinate: Coordinate) => {
    if (!ship) return;
    if (!isShipInGrid(coordinate.x, coordinate.y)) return;
    ship.move(coordinate);
  };

  return {
    moveShip,
  };
}
