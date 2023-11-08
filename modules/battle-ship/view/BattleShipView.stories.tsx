import { type } from "os";
import { BattleShipView } from "./BattleShipView";
import { StoryObj } from "@storybook/react";
import { BattleShip } from "../model/BattleShip";
import { Coordinate } from "@/modules/engine/model/Coordinate";

export default {
  title: "BattleShip",
  component: BattleShipView,
};

type Story = StoryObj<typeof BattleShipView>;

export const Default: Story = {
  args: {
    model: new BattleShip({
      color: "red",
    }),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100px", height: "100px" }}>
        <Story />
      </div>
    ),
  ],
};
