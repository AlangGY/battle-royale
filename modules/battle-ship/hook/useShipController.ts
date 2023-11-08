import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";

interface Props {
  ship: BattleShip;
  grid: BattleGroundGrid;
}

export function useShipController({ ship, grid }: Props) {
  const { size } = grid;
  const [xWidth, yWidth] = size;

  const isShipInGrid = (x: number, y: number) => {
    return x >= 0 && x < xWidth && y >= 0 && y < yWidth;
  };

  const moveShip = (x: number, y: number) => {
    if (!isShipInGrid(x, y)) return;
    ship.move(new Coordinate({ x, y }));
  };

  const moveLeft = () => {
    const { x, y } = ship.coordinate;
    if (!isShipInGrid(x - 1, y)) return;
    ship.move(new Coordinate({ x: x - 1, y }));
  };

  const moveRight = () => {
    const { x, y } = ship.coordinate;
    if (!isShipInGrid(x + 1, y)) return;
    ship.move(new Coordinate({ x: x + 1, y }));
  };

  const moveUp = () => {
    const { x, y } = ship.coordinate;
    if (!isShipInGrid(x, y - 1)) return;
    ship.move(new Coordinate({ x, y: y - 1 }));
  };

  const moveDown = () => {
    const { x, y } = ship.coordinate;
    if (!isShipInGrid(x, y + 1)) return;
    ship.move(new Coordinate({ x, y: y + 1 }));
  };

  return {
    moveShip,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
  };
}
