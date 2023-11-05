import { StoryObj } from "@storybook/react";
import { BattleGroundItemView } from "./BattleGroundItemView";
import { BattleGroundItem } from "../model/BattleGroundItem";

export default {
  title: "BattleGround/Item",
  component: BattleGroundItemView,
};

type Story = StoryObj<typeof BattleGroundItemView>;

export const Default: Story = {
  args: {
    model: new BattleGroundItem({
      status: "empty",
      position: [0, 0],
    }),
  },
};
