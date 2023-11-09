import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";

interface Props {
  ship?: BattleShip | null;
  grid: BattleGroundGrid;
}

export function useShipController({ ship, grid }: Props) {
  const { size } = grid;
  const [xWidth, yWidth] = size;

  const isShipInGrid = (x: number, y: number) => {
    return x >= 0 && x < xWidth && y >= 0 && y < yWidth;
  };

  const moveShip = (coordinate: Coordinate) => {
    if (!ship) return;
    if (!isShipInGrid(coordinate.x, coordinate.y)) return;
    ship.move(coordinate);
  };

  return {
    moveShip,
  };
}
