import { StoryObj } from "@storybook/react";
import { BattleGroundGridView } from "./BattleGroundGridView";
import { BattleGroundGrid } from "../model/BattleGroundGrid";

export default {
  title: "BattleGround/Grid",
  component: BattleGroundGridView,
};

type Story = StoryObj<typeof BattleGroundGridView>;

export const Default: Story = {
  args: { model: new BattleGroundGrid([5, 5]) },
  decorators: [
    (Story) => (
      <div style={{ width: "500px", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
};
