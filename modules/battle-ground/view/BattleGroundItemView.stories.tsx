import { StoryObj } from "@storybook/react";
import { BattleGroundItemView } from "./BattleGroundItemView";
import { BattleGroundItem } from "../model/BattleGroundItem";
import { Coordinate } from "@/modules/engine/model/Coordinate";

export default {
  title: "BattleGround/Item",
  component: BattleGroundItemView,
};

type Story = StoryObj<typeof BattleGroundItemView>;

export const Default: Story = {
  args: {
    model: new BattleGroundItem({
      status: "empty",
      coordinate: new Coordinate({ x: 0, y: 0 }),
    }),
  },
};
