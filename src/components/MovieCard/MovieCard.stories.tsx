import type { Meta, StoryObj } from "@storybook/react";
import MovieCard from "./MovieCard";

const meta: Meta<typeof MovieCard> = {
  title: "Cards/MovieCard",
  component: MovieCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tarjeta que muestra detalles de una película incluyendo título, año, descripción, puntaje y portada.",
      },
    },
  },
  args: {
    title: "Dune: Part Two",
    voteAverage: 8.9,
    posterPath: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    releaseYear: 2024,
    description:
      "Paul Atreides se une a los Fremen para vengar a su familia y prevenir un futuro terrible.",
  },
};

export default meta;

type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {};
