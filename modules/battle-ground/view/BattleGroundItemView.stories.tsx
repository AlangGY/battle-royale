import { StoryObj } from "@storybook/react";
import { BattleGroundItemView } from "./BattleGroundItemView";

export default {
  title: "BattleGround/Item",
  component: BattleGroundItemView,
};

type Story = StoryObj<typeof BattleGroundItemView>;

export const Default: Story = {
  args: {
    status: "empty",
    position: [0, 0],
  },
};
