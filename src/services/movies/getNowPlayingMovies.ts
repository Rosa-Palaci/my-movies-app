import api from "../api";

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await api.get(`/movie/now_playing?language=en-US&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};
