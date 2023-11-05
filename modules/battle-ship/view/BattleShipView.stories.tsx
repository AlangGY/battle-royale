import { type } from "os";
import { BattleShipView } from "./BattleShipView";
import { StoryObj } from "@storybook/react";

export default {
  title: "BattleShip",
  component: BattleShipView,
};

type Story = StoryObj<typeof BattleShipView>;

export const Default: Story = {
  args: {
    status: "alive",
  },
};
