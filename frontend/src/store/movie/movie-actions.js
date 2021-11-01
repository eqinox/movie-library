import { movieActions } from "./movie-slice";
import { notificationActions } from "../notification/notification-slice";
import { userActions } from "../user/user-slice";

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

export const getMovieById = (id) => {
  return async (dispatch) => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:1339/movie/${id}`);

        const movies = await response.json();
        return movies;
      } catch (error) {
        return error;
      }
    };

    try {
      const movie = await fetchMovie();
      if (movie.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: movie.error.message,
          })
        );
      } else {
        dispatch(movieActions.setMovieForReview(movie));
      }
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

export const voteForMovie = (movieId, userToken, selectedNumberVote) => {
  return async (dispatch, getState) => {
    const voteData = async () => {
      try {
        const movieId = getState().movies.movieForReview._id;
        const response = await fetch("http://localhost:1339/movie/vote", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: movieId, number: selectedNumberVote }),
        });

        return await response.json();
      } catch (error) {
        return error;
      }
    };

    try {
      const voteResponse = await voteData();
      if (voteResponse.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: voteResponse.error.message,
          })
        );
      } else {
        dispatch(movieActions.voteForMovie(movieId, voteResponse.totalVOte));
      }
    } catch (error) {}
  };
};

export const deleteMovie = (movieId, userToken) => {
  return async (dispatch) => {
    const deleteData = async () => {
      try {
        const response = await fetch(`http://localhost:1339/movie/${movieId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userToken}` },
        });

        return await response.json();
      } catch (error) {
        return error;
      }
    };

    try {
      const deleteResponse = await deleteData();
      if (deleteResponse.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: deleteResponse.error.message,
          })
        );
      } else {
        dispatch(movieActions.deleteMovie(movieId));
        dispatch(userActions.removeFromFavourite(movieId));
        dispatch(
          notificationActions.showDefaultNotification({
            message: deleteResponse.message,
            status: "success",
          })
        );
      }
    } catch (error) {}
  };
};

export const editMovie = (movieId, userToken, edittedMovie) => {
  return async (dispatch) => {
    const edittedData = async () => {
      try {
        const response = await fetch(`http://localhost:1339/movie/${movieId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(edittedMovie),
        });

        return await response.json();
      } catch (error) {
        return error;
      }
    };

    try {
      const data = await edittedData();
      if (data.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: data.error.message,
          })
        );
      } else {
        dispatch(
          notificationActions.showDefaultNotification({
            message: data.message,
            status: "success",
          })
        );
        dispatch(
          movieActions.setMovieForReview(data.movie)
        )
      }
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
