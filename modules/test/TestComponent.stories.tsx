import { StoryObj } from "@storybook/react";
import { TestComponent } from "./TestComponent";

export default {
  title: "Test Component",
  component: TestComponent,
};

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {};
