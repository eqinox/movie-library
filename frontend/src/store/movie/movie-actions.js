import { movieActions } from "./movie-slice";
import { notificationActions } from "../notification/notification-slice";

export const getAllMovies = () => {
  return async (dispatch) => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:1339/movies");

        const articles = await response.json();
        return articles;
      } catch (error) {
        return error;
      }
    };

    try {
      const movies = await fetchMovies();
      dispatch(movieActions.getAll(movies));
    } catch (error) {
      dispatch(
        notificationActions.showDefaultNotification({
          status: "error",
          message: error.toString(),
        })
      );
    }
  };
};

