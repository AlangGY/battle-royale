import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import { BattleGroundItem } from "./BattleGroundItem";
import { Coordinate } from "@/modules/engine/model/Coordinate";
import { BattleGroundActionMode } from "../types";

export class BattleGroundGrid extends ReactiveModel {
  blocks: BattleGroundItem[][] = [];
  actionMode: BattleGroundActionMode = "standby";

  constructor(size: [number, number]) {
    super();
    this.setBlocks(BattleGroundGrid.generateBlocks(size));
  }

  get size(): [number, number] {
    return [this.blocks.length, this.blocks[0].length];
  }

  setSize(size: [number, number]) {
    this.setBlocks(BattleGroundGrid.generateBlocks(size));
    this.notify();
  }

  setBlocks(blocks: BattleGroundItem[][]) {
    this.blocks = blocks;
    this.blocks.flat().forEach((block) => this.spreadReactivity(block));
    this.notify();
  }

  setActionMode(actionMode: BattleGroundActionMode) {
    this.actionMode = actionMode;
    this.notify();
  }

  private static generateBlocks(size: [number, number]) {
    const blocks: BattleGroundItem[][] = [];
    for (let i = 0; i < size[0]; i++) {
      const row: BattleGroundItem[] = [];
      for (let j = 0; j < size[1]; j++) {
        row.push(
          new BattleGroundItem({ coordinate: new Coordinate({ x: j, y: i }) })
        );
      }
      blocks.push(row);
    }

    return blocks;
  }

  getRandomCoordinate() {
    const x = Math.floor(Math.random() * this.size[0]);
    const y = Math.floor(Math.random() * this.size[1]);
    return new Coordinate({ x, y });
  }
}
