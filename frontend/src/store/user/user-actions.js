import { userActions } from "./user-slice";
import { notificationActions } from "../notification/notification-slice";

export const sendUserData = (newUser, action) => {
  return async (dispatch) => {
    let url;
    if (action === "register") {
      url = "http://localhost:1339/users/register";
    } else if (action === "login") {
      url = "http://localhost:1339/users/login";
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        return await response.json();
      } catch (error) {
        return error;
      }
    };

    try {
      const userData = await fetchData();

      if (userData.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: userData.error.message,
          })
        );
      } else {
        dispatch(userActions.login(userData.user));
        dispatch(
          notificationActions.showDefaultNotification({
            status: "success",
            message: userData.user.message,
          })
        );
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

export const addToFavourite = (movieId, userToken, action) => {
  return async (dispatch) => {
    const favouriteData = async () => {
      try {
        let url;
        if (action === "add") {
          url = "http://localhost:1339/user/add-favourite";
        } else if (action === "remove") {
          url = "http://localhost:1339/user/remove-favourite";
        }
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: movieId }),
        });

        return await response.json();
      } catch (error) {
        console.log("error from user-actions.js");
        return error;
      }
    };

    try {
      const favouriteResponseUser = await favouriteData();
      if (favouriteResponseUser.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: favouriteResponseUser.error.message,
          })
        );
      } else {
        dispatch(userActions.addToFavourite(favouriteResponseUser.favourite));
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

export const addNote = (noteText, userToken) => {
  return async (dispatch, getState) => {
    const noteData = async () => {
      try {
        const movieId = getState().movies.movieForReview._id;
        const response = await fetch("http://localhost:1339/movie/add-note", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: movieId, text: noteText }),
        });

        return await response.json();
      } catch (error) {
        return error;
      }
    };

    try {
      const noteResponse = await noteData();
      if (noteResponse.error) {
        dispatch(
          notificationActions.showDefaultNotification({
            status: "error",
            message: noteResponse.error.message,
          })
        );
      } else {
        dispatch(userActions.addNote(noteResponse));
        dispatch(notificationActions.showShortNotification());
      }
    } catch (error) {}
  };
};
