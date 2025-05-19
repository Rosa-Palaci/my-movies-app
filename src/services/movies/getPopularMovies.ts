import api from "../api";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get(
      `/movie/popular?language=en-US&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};
