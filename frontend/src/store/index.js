import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/user-slice";
import notificationSlice from "./notification/notification-slice";
import movieSlice from "./movie/movie-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    movies: movieSlice.reducer,
  },
});

export default store;
