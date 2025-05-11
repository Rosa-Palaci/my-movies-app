import type { Meta, StoryObj } from "@storybook/react";
import Pill from "./Pill";

const meta: Meta<typeof Pill> = {
  title: "UI/Pill",
  component: Pill,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Componente visual para mostrar una etiqueta redonda con diferentes colores.",
      },
    },
  },
  args: {
    text: "Popular",
    color: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default: Story = {};
export const Destructive: Story = {
  args: {
    color: "destructive",
    text: "Alerta",
  },
};
export const Success: Story = {
  args: {
    color: "sucess",
    text: "Listo",
  },
};
export const Custom: Story = {
  args: {
    color: "custom",
    text: "Especial",
  },
};
