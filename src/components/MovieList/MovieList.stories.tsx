import type { Meta, StoryObj } from "@storybook/react";
import MovieList from "./MovieList";

const meta: Meta<typeof MovieList> = {
  title: "Lists/MovieList",
  component: MovieList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MovieList renderiza una cuadrícula de componentes MovieCard. Cada tarjeta enlaza a la página de detalles de su respectiva película. Es útil para listar películas como 'Popular', 'Now Playing', o 'Top Rated'",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MovieList>;

const mockMovies = [
  {
    id: 1,
    title: "Inception",
    vote_average: 8.8,
    poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    release_date: "2010-07-16",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology.",
  },
  {
    id: 2,
    title: "Interstellar",
    vote_average: 8.6,
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_date: "2014-11-07",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

export const Default: Story = {
  args: {
    movies: mockMovies,
    from: "storybook",
  },
};
