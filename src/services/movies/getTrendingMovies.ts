import api from "../api";

export const getTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day?language=es-MX");
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};
