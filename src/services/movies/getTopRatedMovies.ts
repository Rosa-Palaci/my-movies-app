import api from "../api";

export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await api.get(
      `/movie/top_rated?language=en-US&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};
