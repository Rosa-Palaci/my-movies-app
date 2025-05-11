import api from "../api";

export const getNowPlayingMovies = async () => {
  try {
    const response = await api.get("/movie/now_playing?language=en-US");
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};
