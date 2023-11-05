import { BattleGroundItem } from "./BattleGroundItem";

export class BattleGroundGrid {
  blocks: BattleGroundItem[][];

  constructor(size: [number, number]) {
    this.blocks = BattleGroundGrid.generateBlocks(size);
  }

  get size() {
    return [this.blocks.length, this.blocks[0].length];
  }

  private static generateBlocks(size: [number, number]) {
    const blocks: BattleGroundItem[][] = [];
    for (let i = 0; i < size[0]; i++) {
      const row: BattleGroundItem[] = [];
      for (let j = 0; j < size[1]; j++) {
        row.push(new BattleGroundItem({ position: [i, j] }));
      }
      blocks.push(row);
    }

    return blocks;
  }
}
