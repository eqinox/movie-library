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
