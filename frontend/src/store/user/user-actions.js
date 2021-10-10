import { userActions } from "./user-slice";

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
      console.log(userData);
      if (userData.message) {
        console.log(userData.message);
      } else {
        dispatch(userActions.login(userData.user));
      }
    } catch (error) {
      console.log(error + "*******************");
    }
  };
};
