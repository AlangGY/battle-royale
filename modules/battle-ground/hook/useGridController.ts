import { BattleGroundGrid } from "@/modules/battle-ground/model/BattleGroundGrid";

interface Props {
  grid: BattleGroundGrid;
}

export function useGridController({ grid }: Props) {
  const setSize = (size: [number, number]) => {
    grid.setSize(size);
  };

  return {
    setSize,
  };
}
